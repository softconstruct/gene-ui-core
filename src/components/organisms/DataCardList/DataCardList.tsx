import React, { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";

// Components
import { Index, IndexRange, InfiniteLoader, List, ListRowProps } from "react-virtualized";
import DataCard, { IDataCardProps } from "./DataCard";

// Styles
import "./DataCardList.scss";
import Loader from "../../atoms/Loader";

const noop = () => Promise.resolve();
type Data = IDataCardProps["cardData"][];

const HEIGHT = 400;

interface IDataCardListProps {
    data: Data;
    loadNextPage?: (params: IndexRange) => Promise<any>;
    hasNextPage?: boolean;
    isNextPageLoading?: boolean;
    width?: number;
    /**
     * Size
     * Possible values: `medium | large`;
     */
    size?: IDataCardProps["size"];
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
}

/**
 * DataCardList Component is a responsive alternative to a data table, designed specifically for smaller screens or mobile devices.
 */
const DataCardList: FC<IDataCardListProps> = ({
    className,
    data,
    loadNextPage,
    width = 280,
    hasNextPage,
    size = "medium",
    isNextPageLoading
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const rowCount = hasNextPage ? data.length + 1 : data.length;
    const loadMoreRows = isNextPageLoading || !loadNextPage ? noop : loadNextPage;
    const isRowLoaded = ({ index }: Index) => !hasNextPage || index < data.length;
    const [height, setHeight] = useState(HEIGHT);

    useEffect(() => {
        const resizeHandler = () => {
            if (ref.current) {
                setHeight(ref.current.getBoundingClientRect().height);
            }
        };
        window.addEventListener("resize", resizeHandler);
        resizeHandler();

        return () => window.removeEventListener("resize", resizeHandler);
    }, [ref.current]);

    const rowRenderer = ({ index, key, style }: ListRowProps, itemSize: IDataCardListProps["size"]) => (
        <div key={key} style={style}>
            <DataCard cardData={data[index]} size={itemSize} onActionsClick={() => {}} />
        </div>
    );

    return (
        <div className={classNames("dataCardList", className)} ref={ref}>
            <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount} threshold={1}>
                {({ onRowsRendered, registerChild }) => (
                    <>
                        <List
                            ref={registerChild}
                            onRowsRendered={onRowsRendered}
                            rowRenderer={(props) => rowRenderer(props, size)}
                            height={height}
                            rowHeight={288}
                            rowCount={data.length}
                            width={width}
                        />
                        {isNextPageLoading && <Loader size="small" />}
                    </>
                )}
            </InfiniteLoader>
        </div>
    );
};

export { IDataCardListProps, DataCardList as default };
