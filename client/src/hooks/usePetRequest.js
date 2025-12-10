import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";


export default function usePetRequest(url) {

    const { user, isAuthenticated } = useContext(UserContext);
    const [fetchedData, setFetchedData] = useState([]);

    // get pets
    // get pet by id
    // create pet
    // edit pet
    // delete pet
    // like pet

    const getData = async () => {
        let data = [];

        await fetch(url)
            .then(res => res.json())
            .then(result => {
                data = result;
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });

        return data;
    }

    const petRequest = async (method, data) => {
        let settings = {};

        if (method) {
            settings.method = method;
        }

        if (data) {
            settings.headers = {
                'Content-Type': 'application/json',
            }

            settings.body = JSON.stringify(data)
        }

        if (user?.accessToken) {
            settings.headers = {
                ...settings.headers,
                'X-Authorization': user?.accessToken,
            };
        }

        try {
            const response = await fetch(url, settings);

            if (!response.ok) {
                throw new Error('Failed to delete pet');
            }

            return await response.json();
        } catch (err) {
            console.error('Error deleting pet:', err);
            throw err;
        }
    }

    useEffect(() => {
        getData(url)
            .then(data => setFetchedData(data))
            .catch(err => console.error('Error fetching data:', err));
    }, [url]);

    return {
        fetchedData,
        getData,
        petRequest
    }
}
