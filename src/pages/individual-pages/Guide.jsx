import React from "react";
import styled from "styled-components";
import App from "../../components/App";

export default function Guide() {
  return (
    <App>
      <COntainer>
        <p>
          このは、企業で働く従業員の方々と、大学生とを結びつける出会いの場所です。
        </p>
        <p>このサイトが皆様方の良き出会いの場所となることを祈っています。</p>
        <h2>企業のみなさまへ</h2>
        <ul>
          <li>
            このサイトでは、皆様の業務を一部学生の皆様へ割り当てることにより、従業員の方々の負担を減らし、より難易度の高い業務へ集中することができます。
          </li>
          <li>
            採用した学生が、ある程度の業務をこなすことによって、即戦力の確保を臨むことができます。
          </li>
          <li>
            学生と触れ合い、異なる世代の考えを得ることで、自身の会社の魅力により磨きをかけることができます。
          </li>
        </ul>
        <h2>学生のみなさまへ</h2>
        <ul>
          <li>
            このサイトでは、企業の皆様が必要としている業務に応募することができます。
          </li>
          <li>
            自己プロフィールに、企業の方に説明するようにあなたのことを書いてください。
          </li>
          <li>応募の審査はあなたのプロフィールが多いに関係してきます。</li>
        </ul>
      </COntainer>
    </App>
  );
}

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;
