import useFetch from "../hooks/useFetch";

const ProductList = () => {
  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="grid">
        {data.slice(0, 10).map((item) => (
          <div key={item.id} className="card">
            
            {/* Direct image (no extra div) */}
            <img src={item.images[0]} alt={item.title} />

            <h3>{item.title}</h3>
            {/* <p>₹ {item.price}</p> */}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;