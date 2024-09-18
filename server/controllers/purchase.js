import Purchase from "../models/Purchase.js";

/* REGISTER USER */
export const addPurchase = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      purchaseDate,
      deliveryDate,
      trackingNumber,
      totalPrice,
      contents
    } = req.body;

    const year = String(new Date().getFullYear())
    const month = String(new Date().getMonth()+1)
    const date = String(new Date().getDate())
    let id

    const item = await Purchase.find({ id :{ $regex : year +  month.padStart(2,'0') + date.padStart(2,'0') + '.*' }}).sort({id : -1}).limit(1)

    if(!item.length){
      id = year + month.padStart(2,'0') + date.padStart(2,'0') + '-' + '001'
    } else {
      id = year + month.padStart(2,'0') + date.padStart(2,'0') + '-' + String(parseInt(item[0].id.slice(-3)) + 1).padStart(3, '0')
    }

    const newPurchase = new Purchase({
      id : id,
      name,
      email,
      phone,
      purchaseDate,
      deliveryDate,
      trackingNumber,
      totalPrice,
      contents
    });
    const purchase = await newPurchase.save();
    res.status(201).json(purchase);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

export const getAdminPurchase = async (req, res) => {
  try {
    const {page} = req.params;
    let {
      date,
      user,
      trackingNumber,
    } = req.body;

    date = date ? date : "" //""  = find()에서 사용하기 위해
   
    const total = await Purchase.find().count()
    const purchase = await Purchase.find({ $and: [
      { id: { $regex :  '.*' + date + '.*' } },
      { name: { $regex :  '.*' + user + '.*' } },
      { trackingNumber: { $regex :  '.*' + trackingNumber + '.*' } }
    ] }).skip(10 * (page-1)).limit(10).sort({id : -1})  
    //앞 페이지 * 10개는 건너뛰고, 해당 페이지의 10개만 가져온다...
    // purchase의 총 갯수를 가져온다                                                                 

    const ret  = { purchase, total }
    res.status(201).json(ret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPurchase = async (req, res) => {
  try {
    const {email} = req.params;
    const purchase = await Purchase.find({email:email}).sort({id : -1})
    res.status(201).json(purchase);
    // const {page} = req.params;
    // //앞 페이지 * 10개는 건너뛰고, 해당 페이지의 10개만 가져온다...
    // const purchase = await Purchase.find().skip(10 * (page-1)).limit(10)
    // // purchase의 총 갯수를 가져온다
    // const total = await Purchase.countDocuments()
    // const ret  = { purchase, total }
    // res.status(201).json(ret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



