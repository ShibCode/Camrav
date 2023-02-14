import React from "react";

import Link from "next/link";

const Products = ({ category, products }) => {
  return (
    <section className="text-gray-600 body-font px-24 py-12">
      <h1 className="text-black text-3xl font-semibold text-center">
        Explore our {category} collection
      </h1>

      <div className="container px-5 py-12 mx-auto">
        <div className="grid grid-cols-4 gap-8 -m-4">
          {products.map((product) => {
            return (
              <div key={product._id}>
                <div className="block relative h-96 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product.image}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {category}
                  </h3>
                  <Link
                    href={`/product/${product._id}`}
                    className="text-gray-900 title-font text-lg font-medium leading-6"
                  >
                    {product.name}
                  </Link>
                  <div className="flex gap-1">
                    {Object.keys(product.sizes).map((size) => {
                      return product.sizes[size].availableQty > 0 ? (
                        <div className="w-12 h-8 grid place-items-center border border-gray-300 my-2">
                          {size}
                        </div>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                  <p className="mt-1">Rs {product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
