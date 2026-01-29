import React, { useState } from 'react';
import { UserInput } from '../types';

interface Props {
  onSubmit: (data: UserInput) => void;
  disabled: boolean;
}

const FortuneInput: React.FC<Props> = ({ onSubmit, disabled }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Thần linh cần biết tên bạn!');
      return;
    }
    if (!dob) {
      setError('Vui lòng nhập ngày sinh để lấy bát tự!');
      return;
    }
    setError('');
    onSubmit({ name, dob });
  };

  return (
    <div className="w-full max-w-md p-6 bg-red-900/80 backdrop-blur-sm border-2 border-tet-gold rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
      <h3 className="text-2xl font-serif text-tet-gold text-center mb-6 uppercase tracking-wider">
        Nhập thông tin tín chủ
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-yellow-200 text-sm font-bold mb-2">Họ và Tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg bg-red-950 border border-red-700 text-yellow-100 placeholder-red-400 focus:outline-none focus:border-tet-gold focus:ring-1 focus:ring-tet-gold transition-colors"
            placeholder="Ví dụ: Nguyễn Văn AIVA"
          />
        </div>

        <div>
          <label className="block text-yellow-200 text-sm font-bold mb-2">Ngày Tháng Năm Sinh</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg bg-red-950 border border-red-700 text-yellow-100 focus:outline-none focus:border-tet-gold focus:ring-1 focus:ring-tet-gold transition-colors appearance-none"
          />
        </div>

        {error && (
          <p className="text-red-300 text-sm text-center italic bg-red-950/50 p-2 rounded animate-pulse">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-4 mt-4 rounded-lg font-bold text-lg uppercase tracking-widest transition-all duration-300 transform
            ${disabled 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 shadow-lg hover:shadow-yellow-500/50 hover:-translate-y-1 active:scale-95'
            }
          `}
        >
          {disabled ? 'Đang thỉnh...' : 'Gieo Quẻ Ngay'}
        </button>
      </form>
    </div>
  );
};

export default FortuneInput;
