<template>
  <div class="admin-layout min-h-screen bg-gray-50 flex overflow-hidden">
    <!-- Sidebar -->
    <div class="sidebar w-64 bg-white shadow-md transition-all duration-300 flex flex-col"
         :class="{ 'w-20': collapsed }">
      <div class="logo-container p-4 flex items-center justify-between border-b border-gray-100">
        <div class="flex items-center">
          <img src="../../assets/images/logo.svg" alt="Logo" class="h-8 w-8" />
          <span v-if="!collapsed" class="ml-2 text-xl font-semibold text-primary">后勤可视化平台</span>
        </div>
        <el-button type="text" @click="toggleCollapse" class="text-gray-500 hover:text-primary">
          <el-icon v-if="collapsed">
            <Expand />
          </el-icon>
          <el-icon v-else>
            <Fold />
          </el-icon>
        </el-button>
      </div>

      <div class="menu-container flex-1 py-4 overflow-y-auto">
        <el-menu :default-active="activeMenu" class="border-none" :collapse="collapsed" :collapse-transition="false"
                 @select="handleMenuSelect">
          <el-menu-item index="/dashboard">
            <el-icon>
              <DataBoard />
            </el-icon>
            <template #title>总览页</template>
          </el-menu-item>

          <el-menu-item index="/analytics">
            <el-icon>
              <TrendCharts />
            </el-icon>
            <template #title>详情页</template>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="user-info border-t border-gray-100 p-4" v-if="!collapsed">
        <div class="flex items-center">
          <el-avatar :size="32" src="../../assets/logo.png" />
          <div class="ml-2">
            <div class="text-sm font-medium text-gray-900">管理员</div>
            <div class="text-xs text-gray-500">admin@example.com</div>
          </div>
        </div>
      </div>
      <div class="user-info border-t border-gray-100 p-4 flex justify-center" v-else>
        <el-avatar :size="32" src="https://randomuser.me/api/portraits/men/1.jpg" />
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-container flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm p-4 flex justify-between items-center">
        <div class="flex items-center">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="flex items-center space-x-4">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link cursor-pointer flex items-center">
              <el-avatar :size="32" src="../../assets/logo.png" />
              <span class="ml-1">管理员</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- Footer -->
      <footer class="bg-white p-4 text-center text-gray-500 text-sm border-t border-gray-100">
        © {{ new Date().getFullYear() }} 管理系统 - 版权所有
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const collapsed = ref(false);
const activeMenu = ref("");

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};

const currentPageTitle = computed(() => {
  return route.meta.title || "页面";
});

const handleMenuSelect = (index) => {
  router.push(index);
};

onMounted(() => {
  activeMenu.value = route.path;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.text-primary {
  color: var(--color-primary);
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu-item.is-active) {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

:deep(.el-menu-item:hover) {
  background-color: #f5f7fa;
}
</style>
