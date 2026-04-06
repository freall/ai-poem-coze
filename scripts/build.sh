#!/bin/bash

# 生产环境构建脚本
pnpm install --frozen-lockfile
pnpm build
