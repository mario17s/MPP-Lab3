import { useState, useEffect } from 'react';

export default function Pagination({ itemsPerPage, data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setCurrentItems(data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [data, currentPage, itemsPerPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <ul>
                {currentItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => goToPage(index + 1)}>{index + 1}</button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}

