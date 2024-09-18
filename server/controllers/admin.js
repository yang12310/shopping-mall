import Purchase from "../models/Purchase.js";


export const addDelivery = async (req, res) => {
  const {purchaseId} = req.params;
  try {
    const {
      deliveryDate,
      trackingNumber,
      comments
    } = req.body;
    
    const products = await Purchase.findOneAndUpdate(
      {_id: purchaseId}, //find할때 사용하는 값
      {deliveryDate, trackingNumber, comments}, //업데이트할 내용
      {new: true}
    );
    res.status(201).json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete
export const deleteDelivery = async (req, res) => {
  try {
    const {purchaseId} = req.params;
    const deleted = await Purchase.deleteOne({_id: purchaseId})
    res.status(201).json(deleted);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};