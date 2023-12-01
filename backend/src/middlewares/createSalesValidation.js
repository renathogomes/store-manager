const productIdSalesValidation = (req, res, next) => {
  const { body } = req;
  
  body.every((product) => {
    if (!product.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return true;
  });

  next();
};

const quantitySalesValidation = (req, res, next) => {
  const { body } = req;

  body.every((product) => {
    if (!product.quantity && product.quantity !== 0) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    return true;
  });
  next();
};

const quantitySalesValidation2 = (req, res, next) => {
  const { body } = req;
  
  body.every((product) => {
    if ((Number(product.quantity) <= 0)) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return true;
  });
  next();
};

module.exports = {
  productIdSalesValidation,
  quantitySalesValidation,
  quantitySalesValidation2,
};