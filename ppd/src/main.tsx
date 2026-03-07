import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import UserProvider from './context/UserContext';
import SidebarProvider from './context/SidebarContext';
import ModalContextProvider from './context/ModalContext';
import TaskProvider from './context/TaskContext';
import HabitProvider from './context/HabitContext';
import NotesProvider from './context/NotesContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SidebarProvider>
          <ModalContextProvider>
            <TaskProvider>
              <HabitProvider>
                <NotesProvider>
                  <App />
                </NotesProvider>
              </HabitProvider>
            </TaskProvider>
          </ModalContextProvider>
        </SidebarProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
