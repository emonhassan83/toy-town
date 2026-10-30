const ProductInformation = ({productData}) => {
    const { product_category, base_type, brand, category, collection, color, material, seller, variant, weight } = productData
    return (
        <div className="md:flex items-center justify-between w-full border-2 rounded-3xl my-4 gap-20 p-10">
            <div className="w-full">
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Product Category:</span>
                    <span>{product_category}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Base Type:</span>
                    <span>{base_type}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Brand:</span>
                    <span>{brand}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Category:</span>
                    <span>{category}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Collection:</span>
                    <span>{collection}</span>
                </p>
            </div>
            <div className="w-full">
            <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Color:</span>
                    <span>{color}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Material:</span>
                    <span>{material}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Seller:</span>
                    <span>{seller}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Variant:</span>
                    <span>{variant}</span>
                </p>
                <p className="flex items-center justify-between border-b-2 mb-2">
                    <span className="pb-1 font-semibold">Weight:</span>
                    <span>{weight}</span>
                </p>
            </div>
        </div>
    );
};

export default ProductInformation;