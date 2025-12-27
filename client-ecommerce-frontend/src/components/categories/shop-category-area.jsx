const ShopCategoryArea = () => {
  return (
    <section className="tp-category-area pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper-2 text-center mb-50">
              <h3 className="tp-section-title-2">Shop by Category</h3>
              <p>Discover our amazing fashion collections</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="tp-category-item-2 p-relative z-index-1 text-center mb-30">
              <div className="tp-category-content-2">
                <h4 className="tp-category-title-2">
                  <a href="/shop?category=clothing">Clothing</a>
                </h4>
                <span className="tp-category-count">120+ Products</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="tp-category-item-2 p-relative z-index-1 text-center mb-30">
              <div className="tp-category-content-2">
                <h4 className="tp-category-title-2">
                  <a href="/shop?category=bags">Bags</a>
                </h4>
                <span className="tp-category-count">80+ Products</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="tp-category-item-2 p-relative z-index-1 text-center mb-30">
              <div className="tp-category-content-2">
                <h4 className="tp-category-title-2">
                  <a href="/shop?category=shoes">Shoes</a>
                </h4>
                <span className="tp-category-count">90+ Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCategoryArea;
