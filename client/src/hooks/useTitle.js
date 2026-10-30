import { useEffect } from "react"

const useTitle = title => {
    useEffect( () => {
        document.title = `Toy Town | ${title}`;
    }, [title])
}

export default useTitle;