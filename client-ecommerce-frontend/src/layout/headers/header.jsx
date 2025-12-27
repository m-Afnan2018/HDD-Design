'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
// internal
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import useCartInfo from "@/hooks/use-cart-info";
import OffCanvas from "@/components/common/off-canvas";
import { openCartMini } from "@/redux/features/cartSlice";
import HeaderMainRight from "./header-com/header-main-right";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import HeaderSearchForm from "@/components/forms/header-search-form";
import SearchBar from "./header-com/search-bar";
import { CartTwo, CategoryMenu, Compare, Menu, Phone, Wishlist, Search } from "@/svg";

const Header = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          {/* header main start */}
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image src="/assets/img/logo/logo.jpeg" alt="logo" width={120} height={120} style={{objectFit: 'contain'}} />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-7 d-none d-lg-block">
                  <div className="tp-header-search pl-70">
                    <HeaderSearchForm />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-3 col-md-8 col-6">
                  <HeaderMainRight setIsCanvasOpen={setIsCanvasOpen} />
                </div>
              </div>
            </div>
          </div>

          {/* header bottom start */}
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-12 d-flex justify-content-center">
                    <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* sticky header start */}
      <div id="header-sticky-2" className={`tp-header-sticky-area ${sticky ? 'header-sticky-2' : ''}`}>
        <div className="container">
          <div className="tp-mega-menu-wrapper p-relative">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="logo">
                  <Link href="/">
                    <Image src="/assets/img/logo/logo.jpeg" alt="logo" width={100} height={100} style={{objectFit: 'contain'}} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-5 d-none d-md-flex justify-content-center">
                <div className="tp-header-sticky-menu main-menu menu-style-1 d-none d-lg-block">
                  <nav id="mobile-menu">
                    <Menus />
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                <div className="tp-header-action d-flex align-items-center justify-content-end ml-30">
                  {/* User Account Section for Sticky Header */}
                  <div className="tp-header-action-item tp-header-login d-none d-lg-block">
                    <div className="d-flex align-items-center">
                      <div className="tp-header-login-icon">
                        <span>
                          {user?.name ? (
                            <Link href="/profile" className="tp-header-login-icon-btn">
                              {user?.imageURL ? (
                                <Image
                                  src={user.imageURL}
                                  alt="user img"
                                  width={30}
                                  height={30}
                                  style={{
                                    borderRadius: '50%'
                                  }}
                                />
                              ) : (
                                <div
                                  className="tp-header-user-avatar"
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: '#0989FF',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {user?.name[0].toUpperCase()}
                                </div>
                              )}
                            </Link>
                          ) : (
                            <Link href="/login">
                              <span style={{ fontSize: '14px', color: 'inherit' }}>Login</span>
                            </Link>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tp-header-action-item d-none d-lg-block">
                    <Link href="/compare" className="tp-header-action-btn">
                      <Compare />
                    </Link>
                  </div>
                  <div className="tp-header-action-item d-none d-lg-block">
                    <Link href="/wishlist" className="tp-header-action-btn">
                      <Wishlist />
                      <span className="tp-header-action-badge">{wishlist.length}</span>
                    </Link>
                  </div>
                  <div className="tp-header-action-item d-lg-none">
                    <button onClick={() => setIsSearchOpen(true)} type="button" className="tp-header-action-btn tp-search-open-btn">
                      <Search />
                    </button>
                  </div>
                  <div className="tp-header-action-item">
                    <button onClick={() => dispatch(openCartMini())} type="button" className="tp-header-action-btn cartmini-open-btn">
                      <CartTwo />
                      <span className="tp-header-action-badge">{quantity}</span>
                    </button>
                  </div>
                  <div className="tp-header-action-item d-lg-none">
                    <button onClick={() => setIsCanvasOpen(true)} type="button" className="tp-header-action-btn tp-offcanvas-open-btn">
                      <Menu />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* sticky header end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} />
      {/* off canvas end */}

      {/* search bar start */}
      <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {/* search bar end */}
    </>
  );
};

export default Header;
