import styles from './pagination.module.css'
import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalPokemons, pokemonsPerPage }) => {
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

	let pages = [];

	for (let p = 1; p <= totalPages; p++) {
		pages.push(p);
	}

	return (
		<ul className={styles.paginate}>
			{ currentPage !== 1 && 
                <li >
                    <button className={styles.button} onClick={() => setCurrentPage(currentPage - 1)}>
                        &laquo;
                    </button>
                </li>
            }
			{pages.map((page) => (
				<li
					key={page}
					onClick={() => setCurrentPage(page)}
				>
					<button className={styles.button}>{page}</button>
				</li>
			))}
			{ currentPage !== totalPages && 
                <li>
                    <button className={styles.button} onClick={() => setCurrentPage(currentPage + 1)}>
                        &raquo;
                    </button>
                </li>
            }
		</ul>
	);
}

export default Pagination;