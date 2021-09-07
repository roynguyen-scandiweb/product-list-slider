import Link from 'SourceComponent/Link/Link.container';

export class ProductCardComponentPlugin {
  renderCardLinkWrapper([children, mix], callback, instance) {
    const { linkTo, product: { url } } = instance.props;
    if (!url) {
      return (
        <div
          block="ProductCard"
          elem="Link"
        >
          {children}
        </div>
      );
    }

    const onClick = (e) => {
      instance.registerSharedElement()
      instance.props.onClick && instance.props.onClick(e)
    }
    return (
      <Link
        block="ProductCard"
        elem="Link"
        to={linkTo}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
}

const { renderCardLinkWrapper } = new ProductCardComponentPlugin();

export default {
  "Component/ProductCard/Component": {
    "member-function": {
      renderCardLinkWrapper
    }
  }
};
