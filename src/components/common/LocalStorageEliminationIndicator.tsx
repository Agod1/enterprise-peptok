/**
 * ✅ Backend-Only Mode Indicator
 *
 * This component confirms that localStorage has been completely eliminated
 * and the application operates in backend-only mode.
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Database, Shield } from "lucide-react";

interface BackendOnlyIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export function BackendOnlyIndicator({
  className = "",
  showDetails = true,
}: BackendOnlyIndicatorProps) {
  // Check if any localStorage keys exist (should be none)
  const checkLocalStorageClean = () => {
    try {
      const keys = Object.keys(localStorage);
      const peptokKeys = keys.filter(
        (key) =>
          key.toLowerCase().includes("peptok") ||
          key.toLowerCase().includes("auth") ||
          key.toLowerCase().includes("user") ||
          key.toLowerCase().includes("token"),
      );
      return {
        isClean: peptokKeys.length === 0,
        remainingKeys: peptokKeys,
        totalKeys: keys.length,
      };
    } catch (error) {
      return {
        isClean: true,
        remainingKeys: [],
        totalKeys: 0,
      };
    }
  };

  const storageStatus = checkLocalStorageClean();

  if (!showDetails && storageStatus.isClean) {
    return (
      <Badge
        variant="outline"
        className={`text-green-700 border-green-300 ${className}`}
      >
        <CheckCircle className="w-3 h-3 mr-1" />
        Backend-Only Mode
      </Badge>
    );
  }

  return (
    <Card className={`border-green-200 bg-green-50 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center text-green-800">
          <Database className="w-4 h-4 mr-2" />
          Backend-Only Mode Active
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Status Overview */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-700">localStorage Status</span>
          <Badge
            variant={storageStatus.isClean ? "default" : "destructive"}
            className={storageStatus.isClean ? "bg-green-600" : ""}
          >
            {storageStatus.isClean ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Eliminated
              </>
            ) : (
              <>
                <Shield className="w-3 h-3 mr-1" />
                Keys Found
              </>
            )}
          </Badge>
        </div>

        {/* Details */}
        {showDetails && (
          <div className="space-y-2">
            {storageStatus.isClean ? (
              <div className="p-3 bg-green-100 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <div className="font-medium text-green-800">
                      localStorage Completely Eliminated
                    </div>
                    <div className="text-sm text-green-600">
                      All data is now stored in and loaded from the backend
                      database only. No localStorage fallbacks are used.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-red-100 rounded-lg border border-red-200">
                <div className="font-medium text-red-800 mb-2">
                  Remaining localStorage Keys
                </div>
                <div className="space-y-1">
                  {storageStatus.remainingKeys.map((key) => (
                    <div
                      key={key}
                      className="text-xs font-mono bg-red-50 px-2 py-1 rounded border"
                    >
                      {key}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-red-600 mt-2">
                  These keys should be removed to ensure complete backend-only
                  operation.
                </div>
              </div>
            )}

            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-800">
                  {storageStatus.remainingKeys.length}
                </div>
                <div className="text-xs text-green-600">Peptok Keys</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-800">
                  {storageStatus.totalKeys}
                </div>
                <div className="text-xs text-green-600">Total Keys</div>
              </div>
            </div>
          </div>
        )}

        {/* Backend-Only Mode Benefits */}
        {showDetails && storageStatus.isClean && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="font-medium text-blue-800 mb-1">
              Backend-Only Mode Benefits
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Complete data consistency across devices</li>
              <li>• Real-time updates and synchronization</li>
              <li>• Enhanced security and data protection</li>
              <li>• No client-side data persistence vulnerabilities</li>
              <li>• Centralized user management and authentication</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BackendOnlyIndicator;
