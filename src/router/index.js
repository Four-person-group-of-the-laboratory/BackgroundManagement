import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  // base: '/hms/',
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/personalCenter',
    component: Layout,
    redirect: '/personalCenter/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/personalCenter/index'),
        name: '个人中心'
        // meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '系统首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统首页', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/usersManagement',
    component: Layout,
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'systemUser',
        component: () => import('@/views/usersManagement/systemUser/index'),
        name: '系统用户管理',
        // alwaysShow: true,
        meta: { title: '系统用户管理' }
      },
      {
        path: 'userGroup',
        component: () => import('@/views/usersManagement/userGroup/index'),
        name: '用户组管理',
        meta: { title: '用户组管理' }
      },
      {
        path: 'authority',
        component: () => import('@/views/usersManagement/authority/index'),
        name: '权限管理',
        meta: { title: '权限管理' }
      }
    ]
  },

  {
    path: '/analyticStatistics',
    component: Layout,
    name: '数据统计',
    meta: {
      title: '数据统计',
      icon: 'data'
    },
    children: [
      {
        path: 'testRecords',
        name: '考试记录',
        component: () => import('@/views/analyticStatistics/testRecords/index'),
        meta: { title: '考试记录' }
      },
      {
        path: '/detail',
        name: '考试详情',
        component: () => import('@/views/analyticStatistics/testRecords/detail'),
        meta: { title: '考试详情' },
        hidden: true
      },
      {
        path: 'onlineTimeStatistics',
        name: '在线考试时间统计',
        component: () => import('@/views/analyticStatistics/onlineTimeStatistics/index'),
        meta: { title: '在线考试时间统计' }
      },
      {
        path: 'gradeRetrieval',
        name: '成绩检索',
        component: () => import('@/views/analyticStatistics/gradeRetrieval/index'),
        meta: { title: '成绩检索' }
      },
      {
        path: 'studentsBehaviorStatistical',
        name: '学生行为统计',
        component: () => import('@/views/analyticStatistics/studentsBehaviorStatistical/index'),
        meta: { title: '学生行为统计' }
      },
      {
        path: 'gradeDetail',
        name: '成绩详情',
        component: () => import('@/views/analyticStatistics/gradeDetail/index'),
        meta: { title: '成绩详情' }
      },
      {
        path: 'studentsAbilityCheck',
        name: '学生能力考核',
        component: () => import('@/views/analyticStatistics/studentsAbilityCheck/index'),
        meta: { title: '学生能力考核' }
      }
    ]
  },

  {
    path: '/coursesSubjectManagement',
    component: Layout,
    name: '课程学科管理',
    meta: {
      title: '课程学科管理',
      icon: 'system'
    },
    children: [
      {
        path: 'subjectManagement',
        name: '学科管理',
        component: () => import('@/views/coursesSubjectManagement/subjectManagement/index'),
        meta: { title: '学科管理' }
      },
      {
        path: 'courseManagement',
        name: '课程管理',
        component: () => import('@/views/coursesSubjectManagement/courseManagement/index'),
        meta: { title: '课程管理' }
      },
      {
        path: 'sectionManagement',
        name: '章节管理',
        component: () => import('@/views/coursesSubjectManagement/sectionManagement/index'),
        meta: { title: '章节管理' }
      },
      {
        path: 'knowledgePointManagement',
        name: '知识点管理',
        component: () => import('@/views/coursesSubjectManagement/knowledgePointManagement/index'),
        meta: { title: '知识点管理' }
      }
    ]
  },

  {
    path: '/collegesManagement',
    component: Layout,
    name: '学院管理',
    meta: {
      title: '学院管理',
      icon: 'college'
    },
    children: [
      {
        path: 'collegeManagement',
        name: '学院管理',
        component: () => import('@/views/collegesManagement/collegeManagement/index'),
        meta: { title: '学院管理' }
      },
      {
        path: 'gradeManagement',
        name: '年级管理',
        component: () => import('@/views/collegesManagement/gradeManagement/index'),
        meta: { title: '年级管理' }
      },
      {
        path: 'majorManagement',
        name: '专业管理',
        component: () => import('@/views/collegesManagement/majorManagement/index'),
        meta: { title: '专业管理' }
      },
      {
        path: 'administrativeClassManagement',
        name: '行政班级管理',
        component: () => import('@/views/collegesManagement/administrativeClassManagement/index'),
        meta: { title: '行政班级管理' }
      },
      {
        path: 'lineClassManagement',
        name: '行课班级管理',
        component: () => import('@/views/collegesManagement/lineClassManagement/index'),
        meta: { title: '行课班级管理' }
      },
      {
        path: 'studentsManagement',
        name: '学生管理',
        component: () => import('@/views/collegesManagement/studentsManagement/index'),
        meta: { title: '学生管理' }
      }
    ]
  },

  {
    path: '/questionBankManagement',
    component: Layout,
    name: '题库管理',
    meta: {
      title: '题库管理',
      icon: 'questionBank'
    },
    children: [
      {
        path: 'questionBank',
        name: '题库管理',
        component: () => import('@/views/questionBankManagement/questionBank/index'),
        meta: { title: '题库管理' }
      },
      {
        path: 'questionBankAuthorization',
        name: '题库授权',
        component: () => import('@/views/questionBankManagement/questionBankAuthorization/index'),
        meta: { title: '题库授权' }
      }
    ]
  },

  {
    path: '/testPaperManagement',
    component: Layout,
    name: '试卷管理',
    meta: {
      title: '试卷管理',
      icon: 'paper'
    },
    children: [
      {
        path: 'groupTestPaperManagement',
        name: '组卷管理',
        component: () => import('@/views/testPaperManagement/groupTestPaperManagement/index'),
        meta: { title: '组卷管理' }
      },
      {
        path: 'allocateTest',
        name: '分配正式考试',
        component: () => import('@/views/testPaperManagement/allocateTest/index'),
        meta: { title: '分配正式考试' }
      },
      {
        path: 'questionAuthorization',
        name: '出题授权',
        component: () => import('@/views/testPaperManagement/questionAuthorization/index'),
        meta: { title: '出题授权' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // mode: browserHistory,
  // base: '/vue/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
