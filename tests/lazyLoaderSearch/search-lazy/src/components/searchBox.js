import React, {useState, useEffect, useRef, useCallback} from 'react'
import getData from "../common/getFromApi";
import debounce from '../common/debounce'

export default function SearchBox(props) {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [pageLoadingStatus, setPageLoadingStatus] = useState(false)
    const [error, setError] = useState(false)
    const [hasMoreData, setHasMoreData] = useState(true)
    const txtSearch = useRef()

    useEffect(() => {
        setData([])
    }, [query])


    const fetchData = () => {
        if (query === '') return
        setPageLoadingStatus(true)
        let url = `https://openlibrary.org/search.json?q=${query}&page=${page}`
        let handleData = data => {
            if (data.error !== undefined) {
                setError(data.error)
                return
            }
            let uniqTitles = [...new Set(data.docs.map(x => x.title))]
            setData(prevData => [...prevData, ...uniqTitles])
            setPageLoadingStatus(false)
            setHasMoreData(data.docs.length > 0)
        }
        getData(url, handleData)
    }
    useEffect(() => {
        fetchData()
    }, [query, page])

    const observerToLastElement = useRef()
    const lastElementRef = useCallback(node => {
        if (pageLoadingStatus) return
        if (observerToLastElement.current) observerToLastElement.current.disconnect()
        observerToLastElement.current = new IntersectionObserver(els => {
            if (els[0].isIntersecting && hasMoreData) {
                setPage(prevPage => prevPage + 1)
            }
        })
        if (node) observerToLastElement.current.observe(node)
    }, [pageLoadingStatus, hasMoreData])

    const delayedCallback = debounce((e) => setQuery(e.target.value), 1000)

    const handleChange = (e) => {
        delayedCallback(e)
        setPage(1)
    }

    const handleSubmitClick = (e) => {
        // setQuery(e.target.value)
        setQuery(txtSearch.current.value)
        setPage(1)
    }

    const handleDisplayData = () => {
        if (data.length === 0) return null
        return data.map((title, index) => {
            if (data.length === index + 1)
                return <div key={'rowBooks' + index} ref={lastElementRef}>{title}</div>
            else
                return <div key={'rowBooks' + index}>{title}</div>
        })
    }
    return <div>
        <input ref={txtSearch} onChange={handleChange}/>
        <button onClick={handleSubmitClick}>submit</button>
        <div>{handleDisplayData()}</div>
        {pageLoadingStatus && <div><h1>please wait...</h1></div>}
        {error && <div>{error}</div>}
    </div>
}
