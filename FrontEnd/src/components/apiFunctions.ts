import Instrumento from "../models/instrumentos"

let apiFunctions = {
    getInstruments: async () => {
        let url:string = "http://localhost:3000/instruments",
            options:object = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'
            },
            response:any
            
        try {
            response = await fetch(url, options)
            response = await response.json()
        } catch (e) {
            console.log(e)
        }
        return response as Instrumento[]
    },
    getInstrumetById: async(id:string) => {
        let url:string = `http://localhost:3000/instruments/${id}`,
            options:object = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'
            },
            response:any
        try {
            response = await fetch(url, options)
            response = await response.json()
        } catch (e) {
            console.log(e)
        }
        return response as Instrumento
    }
}

export default apiFunctions