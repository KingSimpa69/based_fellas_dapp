import React, { useState, useEffect } from 'react';
import styles from "@/styles/Collection.module.css";
import Link from 'next/link';
import { shortenEthAddy } from '@/functions/shortenEthAddy';

const Holders = ({windowSize}) => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(data.length / itemsPerPage);
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPageCount) {
        setCurrentPage(newPage);
      }
    };
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchHolders = async () => {
        try {
          const response = await fetch('/api/holders');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const holderList = await response.json();
          isMounted && setData(holderList);
        } catch (error) {
          console.error('Error fetching data:', error);
          isMounted && setData([]);
        } finally {
          isMounted && setLoading(false);
        }
      };
  
      data.length === 0 && isMounted && fetchHolders();
  
      return () => {
        isMounted = false;
      };
    }, [data]);

    return(
        <table className={styles.table}>
        <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Fellas</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3}>
                  Loading...
                </td>
              </tr>
            ) : (
              currentItems.map((e, index) => (
                <tr className={styles.tablerow} key={index}>
                  <td>{e.rank}</td>
                  <td className={styles.walletLink}><Link href={`holders/${e.owner}`}>{windowSize.width < 500 ? shortenEthAddy(e.owner) : e.owner}</Link></td>
                  <td>{e.count}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                <div className={styles.pagination}>
                <p onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  {"BACK"}
                </p>
                <span>
                  {' '}
                  <select value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
                    {Array.from({ length: totalPageCount }, (_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>{' '}
                  of {totalPageCount}
                </span>
                <p onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPageCount}>
                  {"NEXT"}
                </p>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
    )
}

export default Holders