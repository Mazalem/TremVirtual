import React from 'react';
import styled from 'styled-components';

const NavbarForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 20px;
  margin-right: 20px;

  @media (min-width: 769px) {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    justify-content: center;
    margin: 10px 0;
  }
`;

const FormControl = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  margin-right: -1px;
  padding: 5px 10px;
  background-color: #ffffff25;
  color: #fff;
  caret-color: #fff;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    background-color: #ffffff42;
    border-color: #ddd;
    outline: none;
    color: #fff;
  }

  &:focus::placeholder {
    color: #fff;
  }

  &:focus-visible {
    box-shadow: none;
    border-color: #ddd;
  }
`;

const BtnSubmit = styled.button`
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover,
  &:focus {
    background-color: #463b3b91;
    border-color: #FFF;
    color: #ff6347;

    i {
      color: #ff6347;
    }
  }

  i {
    color: #fff;
    font-size: 16px;
    transition: color 0.3s;
  }
`;

function SearchForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");

    if (props.onSubmit) {
      props.onSubmit(query);
    }
  };

  return (
    <NavbarForm method="POST" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        name="query"
      />
      <BtnSubmit type="submit" className="btn-submit">
        <i className="bi bi-search"></i>
      </BtnSubmit>
    </NavbarForm>
  );
}

export default SearchForm;

