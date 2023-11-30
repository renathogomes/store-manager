const productIdSalesValidation = (req, res, next) => {
  const { body } = req;
  
  const retorno = body.every((product) => {
    if (!product.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return true;
  });

  console.log(retorno);
  next();
};

const quantitySalesValidation = (req, res, next) => {
  const { body } = req;

  body.map((product) => {
    if (!product.quantity && product.quantity !== 0) {
      return res.status(400).json({ message: '"quantity" is required' });
    } 
    return next();
  });
};

const quantitySalesValidation2 = (req, res, next) => {
  const { body } = req;
  
  body.map((product) => {
    if ((Number(product.quantity) <= 0)) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return next();
  });
};
  
// body.forEach((product) => {
//   if (!product.quantity && product.quantity !== 0) {
//     return res.status(400).json({ message: '"quantity" is required' });
//   } 
//   if ((Number(product.quantity) <= 0)) {
//     return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
//   }
// });

module.exports = {
  productIdSalesValidation,
  quantitySalesValidation,
  quantitySalesValidation2,
};