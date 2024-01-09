import { Link, useNavigate } from "react-router-dom"
import { GoSignOut } from "react-icons/go"
import logo from '../assets/logo.png'
import Button from "../components/Button"
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum"
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { loggedUser } from "../services/user"
import { findAllTransactions } from "../services/transactions"
import { TransactionEnum } from "../enums/TransactionEnum"

export const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [transactions, setTransactions] = useState([]);

    function validateToken(){
        const token = Cookies.get('token')
        if(!token) {
            navigate("/signIn")
        }
    }

    function signOut() {
        Cookies.remove('token');
    }

    async function getAllTransactions() {
        try {
            const response = await findAllTransactions();
            setTransactions(response.data || []);
        } catch(error) {
            console.log(error)
        }
    }

    async function getLoggedUser() {
        try{
            const logged = await loggedUser();
            setUser(logged?.data?.name);
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        validateToken()
        getLoggedUser()
        getAllTransactions()
    },[])

    return (
        <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2xl">
            <header className="flex items-center justify-between w-full pb-4">
                <img src={logo} alt="Logo Dio Wallet" className="w-32"></img>
                <div className="flex items-center gap-4 text-white text-2xl">
                    <h1>Olá. {user}</h1>
                    <Link to ="/signin" onClick={() => signOut()}>
                        <GoSignOut/>
                    </Link>
                </div>
            </header>
            <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center">
               {transactions.length ? (
                <ul className="w-full h-full flex flex-col justify-between">
                    <div className="h-[17rem] overflow-auto p-3">
                        {transactions.map((transaction: any, index) => {
                            return (
                            <li key={index} className="flex justify-between items-start w-full">
                                {transaction.description}
                            </li>
                            )
                        })}
                    </div>
                    <li>Balance</li>
                </ul>
               ) : <p>No Transactions Available</p>}
            </section>
            <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
                <Button type={ButtonTypeEnum.BUTTON} text="New Input" icon={<BiPlusCircle/>} transaction={TransactionEnum.INPUT}></Button>
                <Button type={ButtonTypeEnum.BUTTON} text="New Output" icon={<BiMinusCircle/>} transaction={TransactionEnum.OUTPUT}></Button>
            </footer>
        </main>
    )
}