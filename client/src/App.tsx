import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Casita from "./pages/Casita";

function AppRouter() {
  const routerBase = typeof window !== "undefined" && window.location.hostname.endsWith(".github.io") ? "/cottonwood-guide" : "";
  return (
    <Router base={routerBase}>
      <Switch>
        <Route path={"/"}>
          <Redirect to="/1casa" />
        </Route>
        <Route path={"/1casa"} component={Home} />
        <Route path={"/1casita"} component={Casita} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
