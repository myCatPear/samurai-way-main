import React, {useState} from 'react';
import s from './Paginator.module.css'

let classNames = require('classnames')

type PaginatorPropsType = {
    totalItemsCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged:(number:number) => void,
    portionSize:number
}

export const Paginator:React.FC<PaginatorPropsType> = (props) => {
    const {currentPage,onPageChanged,pageSize,portionSize,totalItemsCount} = props;

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = []

    for (let i = 1; i <=pagesCount; i +=1) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount/portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const onPrevButtonClick = () => setPortionNumber(portionNumber - 1);
    const onNextButtonClick = () => setPortionNumber(portionNumber + 1)

    return (
        <div className={s.paginator}>
            {
                portionNumber > 1 &&
                <button onClick={onPrevButtonClick}>PREV</button>
            }

            {
                pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => {
                        return <span
                            className={`${props.currentPage === page ? s.selectedPage : ""} ${s.span}`}
                            key={page}
                            onClick={() => onPageChanged(page)}
                            >
                            {page}
                        </span>
                    })
            }

            {
                portionCount > portionNumber  &&
                <button onClick={onNextButtonClick}>NEXT</button>
            }
        </div>
    );
};
