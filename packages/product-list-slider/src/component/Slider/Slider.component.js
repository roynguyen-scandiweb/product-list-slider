import Carousel from 'react-multi-carousel';
import PropTypes from 'prop-types';
import {FilterType} from 'SourceType/ProductList';
import ProductCard from 'SourceComponent/ProductCard/ProductCard.container';

import 'react-multi-carousel/lib/styles.css';
import './Slider.style.scss';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 2, // optional, default to 1.
    partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
    partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
  }
};

export class Slider extends React.PureComponent {
  static propTypes = {
    selectedFilters: FilterType,
    layout: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef()
  }

  setCrumbsZIndex = (zIndex) => {
    if (this.ref && this.ref.current) {
      const crumbs = this.ref.current.querySelector('.AutoSlider-Crumbs')
      if (crumbs) {
        crumbs.style['zIndex'] = zIndex
      }
    }
  }

  renderSlide = (product, idx) => {
    return (
      <div
        key={`slide-${idx}`}
        className="SlideItem"
        onMouseEnter={() => this.setCrumbsZIndex(-1)}
        onMouseLeave={() => this.setCrumbsZIndex(0)}
      >
        <ProductCard
          product={product}
          onClick={(e) => {
            if (this.state && this.state.isMoving) {
              e.preventDefault();
            }
          }}
          {...this.props.productCardProps}
        />
      </div>
    );
  }


  render() {
    const { items } = this.props;

    // Replace with ScandiPwa slider's dot
    const CustomDot = ({ index, onClick, active }) => {
      return (
        <button
          block="Slider"
          elem="Image"
          mods={{ type: 'single' }}
          onClick={e => {
            onClick();
            e.preventDefault();
          }}
          aria-label={__('Slide crumb')}
        >
          <div
            block="Slider"
            elem="Crumb"
            mods={{ isActive: active }}
          />
        </button>
      );
    }
    return <div className="ProductListSliderWrapper" ref={this.ref}>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        infinite={false}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={300}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="CarouselItem"
        dotListClass="AutoSlider-Crumbs"
        customDot={<CustomDot />}
        beforeChange={() => this.setState({ isMoving: true })}
        afterChange={() => this.setState({ isMoving: false })}
      >
        {items.map(this.renderSlide)}
      </Carousel>
    </div>
  }
}

export default Slider
