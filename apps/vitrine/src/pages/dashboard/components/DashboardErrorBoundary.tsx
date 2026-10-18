import React, { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  readonly children: ReactNode;
}

interface State {
  readonly hasError: boolean;
}

export default class DashboardErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("Dashboard error caught by boundary:", error, errorInfo);
    }
    // En production : envoyer à un service de télémétrie sécurisé (ex: Sentry) sans PII
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center" role="alert">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-amber-50 text-amber-600 border border-amber-200 mb-4">
            <AlertTriangle size={24} aria-hidden={true} />
          </div>
          <h2 className="text-base font-bold text-[#15364a]">
            Une erreur d'affichage est survenue
          </h2>
          <p className="mt-1.5 max-w-md text-sm text-slate-500">
            Le module demandé n'a pas pu se charger correctement. Aucune donnée n'a été altérée.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#00964f] px-3.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#008244] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00964f]"
          >
            <RefreshCw size={14} aria-hidden={true} />
            <span>Actualiser le module</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

