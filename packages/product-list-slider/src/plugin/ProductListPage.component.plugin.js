import Slider from '../component/Slider/Slider.component';
import {GRID_LAYOUT} from 'SourceRoute/CategoryPage/CategoryPage.config';

export class ProductListPageComponentPlugin {

  renderPageItems = (args, callback, instance) => {
    if (!instance.props.isWidget) {
      return callback(...args)
    }

    const {
      items,
      selectedFilters,
      mix: {
        mods: {
          layout = GRID_LAYOUT
        } = {}
      }
    } = instance.props;

    const productCardProps = {
      selectedFilters,
      layout,
      ...instance.containerProps()
    }
    return <Slider items={items} productCardProps={productCardProps} />
  }

  render = (args, callback, instance) => {
    if (!instance.props.isWidget) {
      return callback(...args)
    }
    return <div>{instance.renderPageItems()}</div>
  }

}

const { renderPageItems, render } = new ProductListPageComponentPlugin();

export default {
  "Component/ProductListPage/Component": {
    "member-function": {
      renderPageItems,
      render
    }
  }
};
