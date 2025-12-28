'use client';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Compare, Menu, User, Wishlist } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";

const HeaderMainRight = ({ setIsCanvasOpen }) => {
  const { user: userInfo } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { quantity } = useCartInfo();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          <div className="tp-header-login-icon">
            <span>
              {userInfo?.name ? (
                <Link href="/profile" className="tp-header-login-icon-btn">
                  {userInfo?.imageURL ? (
                    <Image
                      src={userInfo.imageURL}
                      alt="user img"
                      width={35}
                      height={35}
                      style={{ borderRadius: '50%' }}
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
                      {userInfo?.name[0].toUpperCase()}
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
            {!userInfo?.name && (
              <Link href="/login">
                <span>Hello,</span>
              </Link>
            )}
            {userInfo?.name && (
              <Link href="/profile" className="tp-header-login-content-btn">
                <span>Hello, {userInfo?.name.split(' ')[0]}</span>
                <div className="tp-header-login-title">
                  <span>Your Account</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="tp-header-action d-flex align-items-center ml-50">
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
        <div className="tp-header-action-item">
          <button
            onClick={() => dispatch(openCartMini())}
            type="button"
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span className="tp-header-action-badge">{quantity}</span>
          </button>
        </div>
        <div className="tp-header-action-item d-lg-none">
          <button
            onClick={() => setIsCanvasOpen(true)}
            type="button"
            className="tp-header-action-btn tp-offcanvas-open-btn"
          >
            <Menu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMainRight;
