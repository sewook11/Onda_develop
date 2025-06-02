"use client";

import React from "react";
import TextInput from "./common/TextInput";
import Button from "./common/Button";

interface Props {
  email: string;
  password: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
export default function LoginForm({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <TextInput
        type="email"
        name="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="이메일"
        required
      />
      <TextInput
        type="password"
        name="password"
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        required
      />
      <Button type="submit" color="primary" className="w-full">
        로그인
      </Button>
    </form>
  );
}
