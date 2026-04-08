
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "@tanstack/react-query": async () => {
          let pkg = await import("__mf__virtual/mfe_entity__prebuild___mf_0_tanstack_mf_1_react_mf_2_query__prebuild__.js");
            return pkg;
        }
      ,
        "@tanstack/react-table": async () => {
          let pkg = await import("__mf__virtual/mfe_entity__prebuild___mf_0_tanstack_mf_1_react_mf_2_table__prebuild__.js");
            return pkg;
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/mfe_entity__prebuild__react__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/mfe_entity__prebuild__react_mf_2_dom__prebuild__.js");
            return pkg;
        }
      ,
        "react-router": async () => {
          let pkg = await import("__mf__virtual/mfe_entity__prebuild__react_mf_2_router__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "@tanstack/react-query": {
            name: "@tanstack/react-query",
            version: "5.95.2",
            scope: ["default"],
            loaded: false,
            from: "mfe_entity",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@tanstack/react-query"}' must be provided by host`);
              }
              usedShared["@tanstack/react-query"].loaded = true
              const {"@tanstack/react-query": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@tanstack/react-query" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.95.2",
              
            }
          }
        ,
          "@tanstack/react-table": {
            name: "@tanstack/react-table",
            version: "8.21.3",
            scope: ["default"],
            loaded: false,
            from: "mfe_entity",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@tanstack/react-table"}' must be provided by host`);
              }
              usedShared["@tanstack/react-table"].loaded = true
              const {"@tanstack/react-table": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@tanstack/react-table" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^8.21.3",
              
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.2.4",
            scope: ["default"],
            loaded: false,
            from: "mfe_entity",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react"}' must be provided by host`);
              }
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.4",
              
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.2.4",
            scope: ["default"],
            loaded: false,
            from: "mfe_entity",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom"}' must be provided by host`);
              }
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.4",
              
            }
          }
        ,
          "react-router": {
            name: "react-router",
            version: "7.13.2",
            scope: ["default"],
            loaded: false,
            from: "mfe_entity",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-router"}' must be provided by host`);
              }
              usedShared["react-router"].loaded = true
              const {"react-router": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-router" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.13.2",
              
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      