import React, { Component } from 'react';
import Products from '../components/Products';
import { connect } from 'react-redux';
import Product from '../components/Product';
import PropTypes from 'prop-types';
import { actAddToCard } from './../actions/index';
import { actChangeMessage } from './../actions/index';
class ProductContainers extends Component {
    render() {
        var { products } = this.props;
        return (
            //Khai báo kiểu children
            <Products>
                {this.showProducts(products)}
            </Products>
        );
    }

    showProducts(products) {
        var result = null
        var { onAddToCart, onChangeMessage } = this.props
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <Product
                    key={index}
                    product={product}
                    onAddToCart={onAddToCart}
                    onChangeMessage={onChangeMessage}
                />
            });
        } return result;

    }
}

// cách check kiểu (type)
ProductContainers.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            iventory: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,

        })
    ).isRequired,
    onChangeMessage: PropTypes.func.isRequired

}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: (product) => {
            dispatch(actAddToCard(product, 1));
        },
        onChangeMessage: (message) => {
            dispatch(actChangeMessage(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainers);