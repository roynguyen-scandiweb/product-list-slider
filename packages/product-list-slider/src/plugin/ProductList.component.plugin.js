export class ProductListComponentPlugin {

  renderPage = (args, callback, instance) => {
    const [arg1, ...rest] = args

    return callback(
      {...arg1, isWidget: instance.props.isWidget},
      ...rest
    )
  }
}

const { renderPage } = new ProductListComponentPlugin();

export default {
  "Component/ProductList/Component": {
    "member-function": {
      renderPage
    }
  }
};
