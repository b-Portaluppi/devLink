import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import Input from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/FirebaseConnerction"; 
import { addDoc, collection, onSnapshot, query, doc, deleteDoc, orderBy } from "firebase/firestore";

interface LinkProps {
    id: string, 
    name: string,
    color: string,
    bg: string
    url: string
}

export function Admin() {
    const [ nameInput, setNameInput ] = useState("")
    const [ urlInput, setUrlInput ] = useState("")
    const [ textColorInput, setTextColorInput ] = useState('#F1F1F1')
    const [ backgroundColorInput, setBackgroundColorInput ] = useState('#121212')
    
    const [ links, setLinks ] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unSub = onSnapshot(queryRef, (snapshot) => {
            const lista: LinkProps[] = [ ] 

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    color: doc.data().color,
                    bg: doc.data().bg,
                    url: doc.data().url
                })
            });

            setLinks(lista)
        })

        return () => {
            unSub()
        }
    }, [])


    function handleRegister(e: FormEvent) {
        e.preventDefault()

        if(nameInput === "" || urlInput === "") {
            alert("Preencha os campos")
            return
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            console.log("CADASTRADO COM SUCESSO")
        }).catch((error) => {
            console.log("ERRO AO CADASTRAR NO BANCO" + error)
        })
    }

    async function handleDeletLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form 
                className="flex flex-col mt-8 mb-3 w-full max-w-xl" 
                onSubmit={ handleRegister }
            >
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input 
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={ (e) => setNameInput(e.target.value) }
                />

                <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
                <Input 
                    placeholder="Digite a URL..."
                    type="url"
                    value={urlInput}
                    onChange={ (e) => setUrlInput(e.target.value) }
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input 
                            type="color"
                            value={ textColorInput } 
                            onChange={ e => setTextColorInput(e.target.value) }
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input 
                            type="color"
                            value={ backgroundColorInput } 
                            onChange={ e => setBackgroundColorInput(e.target.value) }
                        />
                    </div>
                </section>

                { nameInput !== ' ' ? 
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
                        <article 
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}>
                            <p
                                style={{ color: textColorInput }}
                                className="font-medium"
                            >{ nameInput }</p>
                        </article>
                    </div> 
         : ""}

                <button type="submit" className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7">
                    Cadastra
                </button>
            </form>


            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

                { links.map((link) => (
                    <article 
                        className="flex items-center justify-between w-11/12 max-2-xl rounded py-2 mb-2 select-none px-3"
                        style={{ color: link.color, backgroundColor: link.bg}}
                        key={ link.id }
                    >
                        <p>{ link.name }</p>
                             <div>
                                    <button 
                                    className="border border-dashed p-1 rounded"
                                    onClick={() => handleDeletLink(link.id)}
                                    >
                                        <FiTrash size={18} color="white"/></button>
                                </div>
                            </article>
                )) }
        </div>
    )
}