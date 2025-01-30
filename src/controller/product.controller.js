import { apiErrorResponse, apiSuccessResponse, prisma } from "../utils/utils";
export const addProduct = async (req, res) => {
  const {
    product_name,
    product_description,
    product_images,
    quantity,
    product_condition,
    price,
    user_id,
    category,
  } = req.body;
  if (!product_name) {
    return apiErrorResponse(res,400,'Product name is required');
  }
  if(!user_id){
    return apiErrorResponse(res,400,'User Id is required.');
  }
  try {
    const product = await prisma.product.create({
        data:{
            product_name,
            product_description,
            product_images,
            quantity,
            product_condition,
            price,
            user_id,
            category
        },
        select:{
            product_name:true,
        }
    })
    if(!product){
        return apiErrorResponse(res,500,'Error creating product');
    }
    if(product){
        return apiSuccessResponse(res,200,'Product created successfully',product)
    }
  }catch (e){
    console.log(e);
    return apiErrorResponse(res,500,'Error creating product');
  }
};

const updateProduct = async (req,res) => {
 const {
    product_name,
    product_description,
    product_images,
    quantity,
    product_condition,
    price,
    user_id,
    category,
 } = req.body; 
}