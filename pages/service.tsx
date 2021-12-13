import { Icon, HTMLTable, Button, Card, Callout, TextArea, Spinner } from '@blueprintjs/core';
import React from 'react';
import { collection, query } from '@firebase/firestore';
import { db } from '../components/firebase/firebase';
import { getDocs, deleteDoc, doc as firestoreDoc, setDoc, addDoc, doc, where } from 'firebase/firestore';
import { useAuth } from '../components/firebase/firebaseAuth';

export default function Service() {

    const [documents, setDocuments] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [replies, setReplies] = React.useState([]);
    const [mailPwd, setMailPwd] = React.useState('');

    const [error, setError] = React.useState('');
    const [archive, setArchive] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const { currentUser, getMailPwd } = useAuth();

    React.useEffect(() => {
        if (selected != null) {
            const archiveRef = collection(db, 'questions-archive');
            const archiveQuery = query(archiveRef, where("email", "==", documents[selected].email));
            console.log("sex")
            getDocs(archiveQuery).then(newArchiveSnapshot => {
                const newArchive = [];

                newArchiveSnapshot.forEach(doc => { newArchive.push(doc.data()) });

                newArchive.sort((a, b) => {
                    if (a.date.toMillis() > b.date.toMillis())
                        return 1;
                    else if (a.date.toMillis() < b.date.toMillis())
                        return -1;

                    return 0;
                })

                setArchive(newArchive);
                console.log(newArchive);
            });

        }
    }, [selected]);

    const send = () => {
        console.log(mailPwd);

        setLoading(true);
        fetch("/api/send-email", {
            method: "POST",
            body: JSON.stringify({
                email: documents[selected].email,
                message: replies[selected],
                password: mailPwd,
                name: currentUser.displayName,
            }),
        }).then(async () => {

            const archiveRef = collection(db, 'questions-archive');
            await addDoc(archiveRef, {
                email: documents[selected].email,
                message: documents[selected].message,
                reply: replies[selected],
                date: new Date(),
            });

            await deleteDoc(doc(collection(db, 'questions'), documents[selected].id));

            const newDocuments = [...documents];
            newDocuments.splice(selected, 1);
            setDocuments(newDocuments);

            const newReplies = [...replies];
            newReplies.splice(selected, 1);
            setReplies(newReplies);

            setSelected(null);

            setLoading(false);
            setError('');
        }).catch(err => {
            setLoading(false);
            console.log(err);
            setError("Wystąpił błąd.");
        })


    }


    React.useEffect(() => {
        (async () => {
            const ref = collection(db, 'questions');
            const docs = await getDocs(ref);

            const mailpassword = await getMailPwd();
            setMailPwd(mailpassword);

            const docsList = [];

            docs.forEach(doc => {
                docsList.push({ ...doc.data(), id: doc.id });
            })

            setDocuments(docsList);
        })();

    }, []);

    return <>
        <h1 className="text-3xl flex items-center uppercase font-bold"><Icon icon="envelope" className="mr-2" size={30} /> Wiadomości oczekujące odpowiedzi</h1>
        {documents.length ? <>
            <HTMLTable striped bordered className='w-full mt-4 border-l border-r border-b mb-6'>
                <tbody>
                    <tr>
                        <td className='uppercase'>
                            <b>adres e-mail</b>
                        </td>
                        <td className='uppercase'>
                            <b>długość wiadomości</b>
                        </td>
                        <td className='uppercase'>
                            <b>data wysłania</b>
                        </td>
                        <td className='uppercase'>
                            <b>wybierz</b>
                        </td>
                        <td className='uppercase '>
                            <Icon icon="trash" />
                        </td>
                    </tr>
                    {
                        documents.map(doc => {
                            const index = documents.indexOf(doc);

                            return <tr>
                                <td>
                                    {doc.email}
                                </td>
                                <td>
                                    {doc.message.length} characters
                                </td>
                                <td>
                                    {doc.date.toDate().toUTCString()}
                                </td>
                                <td>
                                    <Button intent="primary" className='w-full' small disabled={selected == index} onClick={() => setSelected(index)}>{selected == index ? "WYBRANO" : "WYBIERZ"}</Button>
                                </td>
                                <td>
                                    <Button intent="danger" icon="trash" onClick={() => {
                                        if (confirm("Czy na pewno chcesz usunąć te zapytanie?")) {
                                            deleteDoc(firestoreDoc(collection(db, "questions"), doc.id));

                                            const newDocuments = [...documents];
                                            newDocuments.splice(index, 1);
                                            setDocuments(newDocuments);
                                        }
                                    }}></Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </HTMLTable>
            {selected == null || !documents[selected]
                ? <Callout intent="danger"> WYBIERZ WIADOMOŚĆ </Callout>
                :
                <>
                    <span className='text-lg uppercase'><Icon icon="help" className="mr-1 mb-1" size={20} />treść pytania:</span>
                    <TextArea className='w-full mt-1' style={{ minHeight: 150 }} readOnly value={documents[selected].message} />
                    <span className='text-lg uppercase'><Icon icon="envelope" className="mr-1 mt-6 mb-1" size={20} />twoja odpowiedź:<br /></span>

                    Dzień dobry,
                    <TextArea className='w-full mt-1' style={{ minHeight: 150 }}
                        value={replies[selected] ? replies[selected] : ''}
                        onChange={({ target }) => {
                            const newReplies = [...replies];
                            newReplies[selected] = target.value;
                            setReplies(newReplies);
                        }}
                    />
                    Z wyrazami szacunku, <br />
                    {currentUser.displayName}, zespół Trustree

                    <Button className='w-full mt-4' disabled={!replies[selected] || loading} intent="primary" onClick={() => {
                        if (replies[selected].length && confirm("Czy na pewno? Nie da się odwrócić wysłania.")) {
                            send();
                        }
                    }}>
                        {loading ? <Spinner size={20} /> : "WYŚLIJ"} </Button>
                    {error ? <p className='text-red-500 mt-2 mb-2'>{error}</p> : null}

                    <h1 className="text-xl mt-6 flex items-center uppercase font-bold"><Icon icon="envelope" className="mr-2" size={25} /> poprzednie pytania zadane z adresu e-mail: <p className='ml-2 text-sm'><b>{documents[selected].email}</b></p></h1>
                    {archive.length ? <HTMLTable striped bordered className='w-full mt-4 border-l border-r border-b mb-6'>
                        <tbody>
                            <tr className='uppercase font-bold'>
                                <td>data</td><td>pytanie</td><td>odpowiedź</td>
                            </tr>
                            {
                                archive.map(doc => {
                                    return <tr>
                                        <td>{doc.date.toDate().toUTCString()}</td>
                                        <td>{doc.message}</td>
                                        <td>{doc.reply}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </HTMLTable> : <Callout intent="danger" icon="cross">BRAK</Callout>}
                </>
            }
        </> : <Callout intent="success" className='mt-4'>BRAK WIADOMOŚCI</Callout>}
    </>
}