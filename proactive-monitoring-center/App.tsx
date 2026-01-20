
import React, { useState } from 'react';
import { Activity, Search, Bell, FileText, Calendar, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import AlertPanel from './components/AlertPanel';

// 모달 컴포넌트
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-[480px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="text-slate-500" size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">{children}</div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [memoOpen, setMemoOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-100 text-slate-800 overflow-hidden">
      {/* Sidebar - Fixed Width */}
      <div className="hidden lg:block w-56 h-full shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-10 px-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-sm z-20 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-emerald-500" size={18} />
              농식품모태펀드 투자자산관리시스템
            </h1>
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-bold text-emerald-700">시스템 정상</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200 w-48">
              <Search className="text-slate-400" size={14} />
              <input type="text" placeholder="검색..." className="bg-transparent text-xs outline-none flex-1 text-slate-700 placeholder:text-slate-400" />
            </div>
            <button
              onClick={() => setMemoOpen(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              title="메모"
            >
              <FileText className="text-slate-500" size={18} />
            </button>
            <button
              onClick={() => setCalendarOpen(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              title="일정"
            >
              <Calendar className="text-slate-500" size={18} />
            </button>
            <div className="relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <Bell className="text-slate-500" size={18} />
              <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 text-[8px] flex items-center justify-center font-bold text-white rounded-full">4</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs">김</div>
          </div>
        </header>

        {/* Main Content - No Scroll */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Dashboard Area */}
          <div className="flex-1 p-3 overflow-hidden">
            <MainDashboard />
          </div>

          {/* Right Side Alert Panel */}
          <div className="hidden xl:block w-72 h-full border-l border-slate-200 shrink-0">
            <AlertPanel />
          </div>
        </div>
      </div>

      {/* 메모 모달 */}
      <Modal isOpen={memoOpen} onClose={() => setMemoOpen(false)} title="메모">
        <div className="space-y-4">
          <textarea
            className="w-full h-48 p-3 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="메모를 입력하세요..."
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setMemoOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              취소
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">
              저장
            </button>
          </div>
        </div>
      </Modal>

      {/* 일정 모달 */}
      <Modal isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} title="일정">
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="py-2 font-bold text-slate-500">{day}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <button
                key={i}
                className={`py-2 rounded-lg hover:bg-emerald-100 ${
                  i + 1 === 20 ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'text-slate-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-sm font-bold text-slate-700 mb-2">오늘의 일정</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">분기 보고서 제출</p>
                  <p className="text-xs text-slate-500">14:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">운용사 미팅</p>
                  <p className="text-xs text-slate-500">16:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
