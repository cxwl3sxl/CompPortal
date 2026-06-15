<template>
    <div class="help-placeholder">
        1. 本系统部署于 192.168.0.31 上<br />
        2. 如果需要新增系统，请远程到服务器（桌面有快捷方式：门户注册）或联系研发部处理<br />
        3. 系统注册表位于portal.json以及其引用的文件中<br />
        4. 系统图标支持fa系列图标，如果为空则使用默认图标<br />
        5. fa系列图标点击右侧“ICON清单查询”<br />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.help-placeholder {
    color: var(--text-muted);
    font-size: 14px;
    letter-spacing: 0.3px;
}

.usage-content {
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>