import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import AppShell from "./components/Layout/AppShell"
import ScrollToTop from "./components/Layout/ScrollToTop"
import ErrorBoundary from "./components/Layout/ErrorBoundary"
import Home from "./routes/Home"
import FormulaLibrary from "./routes/FormulaLibrary"
import FormulaDetail from "./routes/FormulaDetail"
import Wizards from "./routes/Wizards"
import Lessons from "./routes/Lessons"
import LessonDetail from "./routes/LessonDetail"
import Tools from "./routes/Tools"
import ToolDetail from "./routes/ToolDetail"
import References from "./routes/References"
import SettingsPage from "./routes/Settings"
import Search from "./routes/Search"
import Saved from "./routes/Saved"
import NotFound from "./routes/NotFound"
import Redirect from "./routes/Redirect"
import Jobs from "./routes/Jobs"
import JobDetail from "./routes/JobDetail"
import JobReport from "./routes/JobReport"
import CalculationSlip from "./routes/CalculationSlip"
import BackupRestore from "./routes/BackupRestore"

const ShellWithBoundary = () => {
  const location = useLocation()
  return (
    <ErrorBoundary resetKey={location.pathname}>
      <AppShell />
    </ErrorBoundary>
  )
}

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ShellWithBoundary />}>
          <Route index element={<Home />} />
          <Route path="formulas" element={<FormulaLibrary />} />
          <Route path="formulas/:id" element={<FormulaDetail />} />
          <Route path="wizards" element={<Wizards />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="lessons/:id" element={<LessonDetail />} />
          <Route path="tools" element={<Tools />} />
          <Route path="tools/:id" element={<ToolDetail />} />
          <Route path="references" element={<References />} />
          <Route path="search" element={<Search />} />
          <Route path="saved" element={<Saved />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="jobs/:id/report" element={<JobReport />} />
          <Route path="jobs/:id/calculations/:calcId/slip" element={<CalculationSlip />} />
          <Route path="backup" element={<BackupRestore />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="redirect" element={<Redirect />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
