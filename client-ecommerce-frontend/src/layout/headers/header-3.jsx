'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { userLoggedOut } from '@/redux/features/auth/authSlice';
// internal
import { CartTwo, Menu, Search, Wishlist, User } from '@/svg';
import Menus from './header-com/menus';
import useSticky from '@/hooks/use-sticky';
import SearchBar from './header-com/search-bar';
import OffCanvas from '@/components/common/off-canvas';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
import useCartInfo from '@/hooks/use-cart-info';
import { openCartMini } from '@/redux/features/cartSlice';

const HeaderThree = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <div id="header-sticky" className={`tp-header-area tp-header-style-transparent-white tp-header-transparent tp-header-sticky has-dark-logo tp-header-height ${sticky ? 'header-sticky' : ''}`}>
          <div className="tp-header-bottom-3 pl-35 pr-35">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image className="logo-light" src="/assets/img/logo/logo-white.jpeg" alt="logo" width={120} height={120} style={{objectFit: 'contain'}} />
                      <Image className="logo-dark" src="/assets/img/logo/logo.jpeg" alt="logo" width={120} height={120} style={{objectFit: 'contain'}} />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 p-relative d-flex align-items-center justify-content-center">
                    <nav className="tp-main-menu-content">
                      <Menus />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                    <div className="tp-header-action-item">
                      <button onClick={() => setIsSearchOpen(true)} type="button" className="tp-header-action-btn tp-search-open-btn">
                        <Search />
                      </button>
                    </div>
                    <div className="tp-header-action-item d-none d-lg-block">
                      <Link href="/wishlist" className="tp-header-action-btn">
                        <Wishlist />
                        <span className="tp-header-action-badge">{wishlist.length}</span>
                      </Link>
                    </div>
                    {/* User Account Section */}
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
                                    width={35}
                                    height={35}
                                    style={{
                                      borderRadius: '50%'
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="tp-header-user-avatar"
                                    style={{
                                      width: '35px',
                                      height: '35px',
                                      borderRadius: '50%',
                                      backgroundColor: '#0989FF',
                                      color: 'white',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '16px',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    {user?.name[0].toUpperCase()}
                                  </div>
                                )}
                              </Link>
                            ) : (
                              <Link href="/login">
                                <User />
                              </Link>
                            )}
                          </span>
                        </div>
                        <div className="tp-header-login-content d-none d-xl-block">
                          {!user?.name && (
                            <Link href="/login">
                              <span>Hello,</span>
                            </Link>
                          )}
                          {user?.name && (
                            <Link href="/profile" className="tp-header-login-content-btn">
                              <span>Hello, {user?.name.split(' ')[0]}</span>
                              <div className="tp-header-login-title">
                                <span>Your Account</span>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
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
      </header>

      {/* search bar start */}
      <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {/* search bar end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} />
      {/* off canvas end */}
    </>
  );
};

export default HeaderThree;