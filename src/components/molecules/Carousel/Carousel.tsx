import React, { FC, ReactElement, useLayoutEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "@geneui/icons";

// Hooks
import useSwipe from "../../../hooks/useSwipe";

// Styles
import "./Carousel.scss";

// Components
import CarouselItem from "./CarouselItem";
import Button from "../../atoms/Button";

interface ICarouselProps {
    /**
     * Additional class for the parent element.
     * This prop should be used to set placement properties for the element relative to its parent using BEM conventions.
     */
    className?: string;
    /**
     * Dots and arrow buttons direction <br/>
     * Possible values: `horizontal | vertical`
     */
    direction?: "horizontal" | "vertical";
    /**
     * Carousel size
     * Possible values: `large | small`
     */
    size?: "large" | "small";
    /**
     * Enables the display of arrows for navigation between slides <br/>
     */
    withSlideArrows?: boolean;
    /**
     * Enables the display of indicators <br/>
     */
    withIndicators?: boolean;
    /**
     * Content elements
     */
    children?: ReactElement<typeof CarouselItem>[];
}

const DOTS_LIMIT = 6;

/**
 * The Carousel component is ideal for displaying multiple content items, such as images, product highlights, or customer testimonials, in a limited space. By using navigation arrows, pagination dots, or autoplay, users can engage with content sequentially and interactively.
 */
const Carousel: FC<ICarouselProps> = ({
    className,
    children = [],
    direction = "horizontal",
    size = "large",
    withSlideArrows = true,
    withIndicators = true
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dotsRange, setDotsRange] = useState([0, DOTS_LIMIT]);
    const count = children.length;

    const onPrevClick = () => setSelectedIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
    const onNextClick = () => setSelectedIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));

    // TODO: Implement mobile detection and use it to set isMobile value
    const isMobile = false;

    const areArrowsVisible = withSlideArrows && !isMobile;

    const swipeCallbacks = useMemo(() => {
        if (direction === "horizontal") {
            return { onSlideLeft: onPrevClick, onSlideRight: onNextClick };
        }

        return { onSlideUp: onPrevClick, onSlideDown: onNextClick };
    }, [direction]);

    const ref = useSwipe<HTMLDivElement>(swipeCallbacks);

    useLayoutEffect(
        () =>
            setDotsRange(([min, max]) => {
                let newMin = min;
                let newMax = max;

                if (selectedIndex === 0) {
                    return [0, DOTS_LIMIT];
                }

                if (selectedIndex === count - 1) {
                    return [count - DOTS_LIMIT > 0 ? count - DOTS_LIMIT : 0, count];
                }

                if (selectedIndex >= max - 1 && max !== count) {
                    newMax++;
                    newMin++;
                }

                if (selectedIndex <= min && min !== 0) {
                    newMax--;
                    newMin--;
                }

                return [newMin, newMax];
            }),
        [selectedIndex, count]
    );

    return (
        <div
            className={classNames(`carousel carousel_slider carousel_${size} carousel_${direction}`, className)}
            ref={ref}
        >
            {areArrowsVisible && (
                <Button
                    className="carousel__button carousel__button_back"
                    Icon={ChevronLeft}
                    appearance="inverse"
                    onClick={onPrevClick}
                    ariaLabel="select-previews"
                />
            )}
            {children[selectedIndex]}
            {areArrowsVisible && (
                <Button
                    className="carousel__button carousel__button_forward"
                    Icon={ChevronRight}
                    appearance="inverse"
                    onClick={onNextClick}
                    ariaLabel="select-next"
                />
            )}
            {withIndicators && (
                <div className="carousel__dots">
                    {Array.from(Array(count).keys())
                        .slice(...dotsRange)
                        .map((index) => (
                            <button
                                type="button"
                                aria-label={`select slide ${index + 1}`}
                                onClick={() => setSelectedIndex(index)}
                                key={index}
                                className={classNames(
                                    `carousel__dot ${index === selectedIndex ? "carousel__dot_active" : ""}`
                                )}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export { ICarouselProps, Carousel as default };
