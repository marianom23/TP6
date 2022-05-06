
import { useEffect, useState } from "react";
import NavBar from './NavBar';
import apiFunctions from './apiFunctions';
import ItemList from './ItemList';
import Instrumento from "../models/instrumentos";


function InstrumentList() {

    const [isLoading, setIsLoading] = useState(true);
    const [instrumentos, setInstrumento] = useState<Instrumento[]>([]);

    useEffect(() => {
        getFetchData()
    }, []);

    let getFetchData = async () => {
        let fetchData:Instrumento[] = await apiFunctions.getInstruments()
        setIsLoading(false)
        setInstrumento(fetchData)
    } 
    if (isLoading) {
        return (
            <>
                <body style={{ backgroundColor: "#ededed" }}>
                    <NavBar></NavBar>
                    <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                        <h1>Loading...</h1>
                    </div>
                </body>
            </>
        );
    }
    return (

        <body style={{ backgroundColor: "#ededed" }}>
            <NavBar></NavBar>
            <div className='container' style={{ display: "flex", justifyContent: "center"}}>
                <ItemList instrumentos={instrumentos}></ItemList>
            </div>
        </body>

    );
}

export default InstrumentList;
