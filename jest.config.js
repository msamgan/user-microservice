import { defaults } from "jest-config"

export default async () => {
    return {
        preset: "ts-jest",
        testEnvironment: "node",
        verbose: true,
        moduleFileExtensions: [...defaults.moduleFileExtensions, "js"]
    }
}
