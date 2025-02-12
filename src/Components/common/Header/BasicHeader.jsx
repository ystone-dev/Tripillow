import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import userToken from '../../../Recoil/userToken/userToken';
import isLogin from '../../../Recoil/isLogin/isLogin';
import accountName from '../../../Recoil/accountName/accountName';
import { isKorea, isOverseas } from '../../../Recoil/whichCountry/whichCountry';
import ProductDeleteAPI from '../../../Utils/ProductDeleteAPI';
import Modal from '../Modal/Modal';
import HeaderLayout from '../../../Styles/HeaderLayout';
import AlertModal from '../Modal/AlertModal';
import prev from '../../../Assets/icons/icon-arrow-back.svg';
import more from '../../../Assets/icons/icon-more-vertical.svg';

const BasicHeader = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [token, setToken] = useRecoilState(userToken);
  const [login, setLogin] = useRecoilState(isLogin);
  const [name, setName] = useRecoilState(accountName);
  const [korea, setKorea] = useRecoilState(isKorea);
  const [overseas, setOverseas] = useRecoilState(isOverseas);
  const location = useLocation();
  const currentPath = location.pathname.split('/');

  const userId = props.userId;

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setModal(false);
  }, []);

  const handleMorebutton = () => {
    setModal(!modal);
  };

  const handleLogoutbutton = (e) => {
    e.stopPropagation();
    setModal(false);
    setAlertModal(true);
  };

  const handleCancel = () => {
    setAlertModal(false);
    setModal(false);
  };

  const handleLogout = () => {
    setToken('');
    setLogin(false);
    setName('');
    navigate('/');
    setKorea(true);
    setOverseas(false);
  };

  const handleProductDelete = ProductDeleteAPI(userId);

  const handleDelete = async () => {
    await handleProductDelete();
    setIsDeleted(true);
  };

  useEffect(() => {
    if (isDeleted) navigate('/profile', { state: { isDeleted } });
  }, [isDeleted]);

  const handleModify = () => {
    navigate('/modifyproduct', { state: userId });
  };

  const goSetting = () => {
    navigate('/profile/setting');
  };

  return (
    <HeaderLayout>
      <ContentLayout>
        <PrevButton
          onClick={() => {
            navigate(-1);
          }}
        />
        {props.children && <HeaderContent>{props.children}</HeaderContent>}
      </ContentLayout>
      {props.empty || currentPath[currentPath.length - 1] == 'setting' ? null : (
        <MoreButton onClick={handleMorebutton} />
      )}
      {modal && (
        <Modal
          btn1={props.btn1}
          btn2={props.btn2}
          handleMorebutton={handleMorebutton}
          handleLogoutbutton={handleLogoutbutton}
          bottom={props.isPost && '60px'}
          handleProductModify={userId ? handleModify : null}
          goSetting={goSetting}
          handleCancel={handleCancel}
        />
      )}
      {alertModal && (
        <AlertModal
          txt={props.txt}
          rightbtn={props.rightbtn}
          logout={userId ? handleDelete : handleLogout}
          handleCancel={handleCancel}
        />
      )}
    </HeaderLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  height: 22px;
  line-height: 1.6;
`;

const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;

const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${more});
`;

export default BasicHeader;
