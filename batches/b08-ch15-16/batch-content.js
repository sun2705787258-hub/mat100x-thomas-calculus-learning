window.BATCH_FORMULAS = {
  "b8-scalar-line": "\\int_C f(x,y,z)\\,ds=\\int_a^b f(\\mathbf r(t))|\\mathbf r'(t)|\\,dt",
  "b8-ds": "ds=|\\mathbf r'(t)|\\,dt=\\sqrt{x'(t)^2+y'(t)^2+z'(t)^2}\\,dt",
  "b8-vector-line": "\\int_C \\mathbf F\\cdot d\\mathbf r=\\int_a^b \\mathbf F(\\mathbf r(t))\\cdot\\mathbf r'(t)\\,dt",
  "b8-work": "W=\\int_C \\mathbf F\\cdot d\\mathbf r,\\qquad \\operatorname{flow}=\\int_C \\mathbf F\\cdot\\mathbf T\\,ds",
  "b8-circulation": "\\oint_C \\mathbf F\\cdot d\\mathbf r",
  "b8-flux-2d": "\\oint_C \\mathbf F\\cdot\\mathbf n\\,ds",
  "b8-ftli": "\\int_C \\nabla f\\cdot d\\mathbf r=f(B)-f(A)",
  "b8-conservative-test": "P_y=Q_x,\\quad Q_z=R_y,\\quad P_z=R_x",
  "b8-green-curl": "\\oint_C P\\,dx+Q\\,dy=\\iint_R\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA",
  "b8-green-flux": "\\oint_C \\mathbf F\\cdot\\mathbf n\\,ds=\\iint_R\\left(\\frac{\\partial P}{\\partial x}+\\frac{\\partial Q}{\\partial y}\\right)dA",
  "b8-green-area": "A=\\frac12\\oint_C x\\,dy-y\\,dx",
  "b8-surface-param": "\\mathbf r(u,v)=x(u,v)\\mathbf i+y(u,v)\\mathbf j+z(u,v)\\mathbf k,\\quad (u,v)\\in R",
  "b8-surface-area": "d\\sigma=|\\mathbf r_u\\times\\mathbf r_v|\\,du\\,dv",
  "b8-graph-area": "d\\sigma=\\sqrt{1+f_x^2+f_y^2}\\,dx\\,dy",
  "b8-scalar-surface": "\\iint_S f(x,y,z)\\,d\\sigma=\\iint_R f(\\mathbf r(u,v))|\\mathbf r_u\\times\\mathbf r_v|\\,du\\,dv",
  "b8-vector-surface": "\\iint_S \\mathbf F\\cdot\\mathbf n\\,d\\sigma=\\iint_R \\mathbf F(\\mathbf r(u,v))\\cdot(\\mathbf r_u\\times\\mathbf r_v)\\,du\\,dv",
  "b8-curl": "\\nabla\\times\\mathbf F=\\left(R_y-Q_z\\right)\\mathbf i+\\left(P_z-R_x\\right)\\mathbf j+\\left(Q_x-P_y\\right)\\mathbf k",
  "b8-stokes": "\\oint_C \\mathbf F\\cdot d\\mathbf r=\\iint_S(\\nabla\\times\\mathbf F)\\cdot\\mathbf n\\,d\\sigma",
  "b8-divergence": "\\nabla\\cdot\\mathbf F=\\frac{\\partial P}{\\partial x}+\\frac{\\partial Q}{\\partial y}+\\frac{\\partial R}{\\partial z}",
  "b8-divergence-theorem": "\\iint_S \\mathbf F\\cdot\\mathbf n\\,d\\sigma=\\iiint_D(\\nabla\\cdot\\mathbf F)\\,dV",
  "b8-euler": "x_{n+1}=x_n+h,\\qquad y_{n+1}=y_n+h\\,f(x_n,y_n)",
  "b8-linear-solution": "y'+P(x)y=Q(x)\\quad\\Longrightarrow\\quad y=e^{-\\int P\\,dx}\\left(C+\\int Q e^{\\int P\\,dx}dx\\right)",
  "b8-integrating-factor": "\\mu(x)=e^{\\int P(x)\\,dx},\\qquad (\\mu y)'=\\mu Q",
  "b8-logistic": "\\frac{dy}{dt}=ky\\left(1-\\frac{y}{M}\\right)",
  "b8-phase-line": "\\frac{dy}{dt}=f(y),\\qquad f(y_*)=0",
  "b8-linear-system": "\\mathbf X'=A\\mathbf X,\\qquad \\det(A-\\lambda I)=0"
};

window.STUDY_CONTENT = {
  "terms": [
    {
      "en": "scalar line integral",
      "zh": "标量线积分",
      "definition": "沿曲线对函数值乘弧长元素求和。",
      "section": "15.1",
      "chapter": "15",
      "note": "∫C f ds"
    },
    {
      "en": "arc-length element",
      "zh": "弧长元素",
      "definition": "曲线参数速度的模乘参数增量。",
      "section": "15.1",
      "chapter": "15",
      "note": "ds=|r′|dt"
    },
    {
      "en": "piecewise smooth curve",
      "zh": "分段光滑曲线",
      "definition": "可分成有限段且每段具有连续非零切向的曲线。",
      "section": "15.1",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "orientation of a curve",
      "zh": "曲线定向",
      "definition": "沿参数增加方向指定起点到终点的方向。",
      "section": "15.1",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "mass of a wire",
      "zh": "线材质量",
      "definition": "密度沿曲线的标量线积分。",
      "section": "15.1",
      "chapter": "15",
      "note": "m=∫C δ ds"
    },
    {
      "en": "center of mass of a wire",
      "zh": "线材质心",
      "definition": "坐标乘密度后的线积分除以质量。",
      "section": "15.1",
      "chapter": "15",
      "note": "x̄=M_yz/m"
    },
    {
      "en": "moment of inertia of a wire",
      "zh": "线材转动惯量",
      "definition": "到轴距离平方乘密度线积分。",
      "section": "15.1",
      "chapter": "15",
      "note": "I_L=∫C r⊥²δ ds"
    },
    {
      "en": "vector field",
      "zh": "向量场",
      "definition": "在区域每一点指定一个向量。",
      "section": "15.2",
      "chapter": "15",
      "note": "F(x,y,z)"
    },
    {
      "en": "planar vector field",
      "zh": "平面向量场",
      "definition": "定义在 xy 平面区域上的二维向量场。",
      "section": "15.2",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "space vector field",
      "zh": "空间向量场",
      "definition": "定义在三维区域上的三个分量向量场。",
      "section": "15.2",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "velocity field",
      "zh": "速度场",
      "definition": "用向量表示流场中每点流体或粒子的速度。",
      "section": "15.2",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "force field",
      "zh": "力场",
      "definition": "用向量表示每点作用的力。",
      "section": "15.2",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "gradient field",
      "zh": "梯度场",
      "definition": "某个标量函数的梯度所形成的向量场。",
      "section": "15.3",
      "chapter": "15",
      "note": "F=∇f"
    },
    {
      "en": "work integral",
      "zh": "功积分",
      "definition": "力向量沿曲线切向分量的线积分。",
      "section": "15.2",
      "chapter": "15",
      "note": "W=∫C F·dr"
    },
    {
      "en": "circulation",
      "zh": "环量",
      "definition": "闭曲线上的切向线积分。",
      "section": "15.2",
      "chapter": "15",
      "note": "∮C F·dr"
    },
    {
      "en": "flow along a curve",
      "zh": "沿曲线的流动积分",
      "definition": "速度场沿有向曲线的切向累积。",
      "section": "15.2",
      "chapter": "15",
      "note": "∫C F·T ds"
    },
    {
      "en": "flux across a plane curve",
      "zh": "平面曲线通量",
      "definition": "向量场沿曲线法向分量的累积。",
      "section": "15.2",
      "chapter": "15",
      "note": "∮C F·n ds"
    },
    {
      "en": "outward normal",
      "zh": "外法向",
      "definition": "正方向闭曲线指向外侧的单位法向量。",
      "section": "15.2",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "differential form notation",
      "zh": "微分形式记号",
      "definition": "把线积分写成 P dx+Q dy+R dz。",
      "section": "15.2",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "path independence",
      "zh": "路径独立",
      "definition": "同一对端点的线积分与连接路径无关。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "conservative field",
      "zh": "保守场",
      "definition": "具有势函数且线积分路径独立的向量场。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "potential function",
      "zh": "势函数",
      "definition": "其梯度等于给定向量场的标量函数。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "simply connected region",
      "zh": "单连通区域",
      "definition": "区域内任一闭曲线都能在区域内连续收缩为一点。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "component test for conservative fields",
      "zh": "保守场分量检验",
      "definition": "在合适区域内用 P_y=Q_x 等条件判断梯度场。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "exact differential",
      "zh": "恰当微分",
      "definition": "存在势函数 f 使 df=P dx+Q dy+R dz。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "Fundamental Theorem for Line Integrals",
      "zh": "线积分基本定理",
      "definition": "梯度场线积分等于势函数在终点的差。",
      "section": "15.3",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "positively oriented boundary",
      "zh": "正方向边界",
      "definition": "沿边界前进时区域保持在左侧的方向。",
      "section": "15.4",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "circulation density",
      "zh": "环量密度",
      "definition": "二维向量场的 Q_x−P_y，表示局部旋转趋势。",
      "section": "15.4",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "divergence density",
      "zh": "散度密度",
      "definition": "二维向量场的 P_x+Q_y，表示局部净流出趋势。",
      "section": "15.4",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "Green's Theorem circulation form",
      "zh": "Green定理环量形式",
      "definition": "边界环量等于区域内部二维旋度积分。",
      "section": "15.4",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "Green's Theorem flux form",
      "zh": "Green定理通量形式",
      "definition": "边界外通量等于区域内部散度积分。",
      "section": "15.4",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "parameterized surface",
      "zh": "参数曲面",
      "definition": "用两个参数在空间中的像描述曲面。",
      "section": "15.5",
      "chapter": "15",
      "note": "r(u,v)"
    },
    {
      "en": "smooth parameterized surface",
      "zh": "光滑参数曲面",
      "definition": "参数化连续可微且内部 ru×rv 非零。",
      "section": "15.5",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "fundamental vector product",
      "zh": "基本向量积",
      "definition": "参数偏导向量的叉积 ru×rv。",
      "section": "15.5",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "surface area element",
      "zh": "曲面面积元素",
      "definition": "参数叉积的模乘参数面积元素。",
      "section": "15.5",
      "chapter": "15",
      "note": "dσ=|ru×rv|du dv"
    },
    {
      "en": "scalar surface integral",
      "zh": "标量曲面积分",
      "definition": "函数值相对曲面面积的积分。",
      "section": "15.6",
      "chapter": "15",
      "note": "∬S f dσ"
    },
    {
      "en": "orientation of a surface",
      "zh": "曲面定向",
      "definition": "连续选择单位法向量的一侧。",
      "section": "15.6",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "flux through a surface",
      "zh": "曲面通量",
      "definition": "向量场法向分量在曲面上的积分。",
      "section": "15.6",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "orientable surface",
      "zh": "可定向曲面",
      "definition": "能够连续指定两侧法向的曲面。",
      "section": "15.6",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "piecewise smooth surface",
      "zh": "分段光滑曲面",
      "definition": "由有限块光滑曲面按边拼接而成。",
      "section": "15.6",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "curl",
      "zh": "旋度",
      "definition": "向量场局部旋转趋势对应的向量。",
      "section": "15.7",
      "chapter": "15",
      "note": "curl F=∇×F"
    },
    {
      "en": "Stokes' Theorem",
      "zh": "Stokes定理",
      "definition": "曲面 curl 通量等于边界曲线环量。",
      "section": "15.7",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "compatible orientation",
      "zh": "相容定向",
      "definition": "曲面法向与边界方向满足右手定则。",
      "section": "15.7",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "divergence",
      "zh": "散度",
      "definition": "向量场局部源或汇强度的标量密度。",
      "section": "15.8",
      "chapter": "15",
      "note": "div F=∇·F"
    },
    {
      "en": "Divergence Theorem",
      "zh": "散度定理",
      "definition": "闭曲面外通量等于内部散度体积分。",
      "section": "15.8",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "solid region",
      "zh": "立体区域",
      "definition": "闭曲面所包围的三维区域。",
      "section": "15.8",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "closed surface",
      "zh": "闭曲面",
      "definition": "没有边界的封闭曲面。",
      "section": "15.8",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "source",
      "zh": "源",
      "definition": "散度为正、局部产生流出的点或区域。",
      "section": "15.8",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "sink",
      "zh": "汇",
      "definition": "散度为负、局部吸收流入的点或区域。",
      "section": "15.8",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "del operator",
      "zh": "Nabla算子",
      "definition": "组织梯度、散度和旋度的向量微分算子。",
      "section": "15.8",
      "chapter": "15",
      "note": "∇"
    },
    {
      "en": "unified vector integral theory",
      "zh": "向量积分统一理论",
      "definition": "以边界积分与内部导数积分的对应统一多个定理。",
      "section": "15.8",
      "chapter": "15",
      "note": ""
    },
    {
      "en": "differential equation",
      "zh": "微分方程",
      "definition": "含未知函数及其导数的方程。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "order of a differential equation",
      "zh": "微分方程阶数",
      "definition": "方程中出现的最高阶导数阶数。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "first-order differential equation",
      "zh": "一阶微分方程",
      "definition": "只含一阶导数的微分方程。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "solution of a differential equation",
      "zh": "微分方程的解",
      "definition": "在区间上代入后使方程恒成立的函数。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "solution curve",
      "zh": "解曲线",
      "definition": "微分方程某个解在平面中的图像。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "general solution",
      "zh": "通解",
      "definition": "包含所有解并带任意常数的解族。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "particular solution",
      "zh": "特解",
      "definition": "满足给定初始条件的单个解。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "initial condition",
      "zh": "初始条件",
      "definition": "指定解在某点的函数值。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "initial value problem",
      "zh": "初值问题",
      "definition": "微分方程连同初始条件。",
      "section": "16.1",
      "chapter": "16",
      "note": "IVP"
    },
    {
      "en": "slope field",
      "zh": "斜率场",
      "definition": "在各点画出 dy/dx=f(x,y) 的短线段。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "direction field",
      "zh": "方向场",
      "definition": "斜率场的另一名称。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "Euler's method",
      "zh": "Euler法",
      "definition": "沿当前斜率用固定步长近似积分曲线。",
      "section": "16.1",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "step size",
      "zh": "步长",
      "definition": "Euler 法等数值方法中 x 的固定增量。",
      "section": "16.1",
      "chapter": "16",
      "note": "h"
    },
    {
      "en": "first-order linear equation",
      "zh": "一阶线性方程",
      "definition": "可写成 y′+P(x)y=Q(x) 的方程。",
      "section": "16.2",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "standard linear form",
      "zh": "线性标准形",
      "definition": "首项导数为 y′ 且 y 项系数为 P(x)。",
      "section": "16.2",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "homogeneous linear equation",
      "zh": "齐次线性方程",
      "definition": "Q(x)=0 时的一阶线性方程。",
      "section": "16.2",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "integrating factor",
      "zh": "积分因子",
      "definition": "使线性方程左侧合并为乘积导数的因子。",
      "section": "16.2",
      "chapter": "16",
      "note": "μ=e∫P dx"
    },
    {
      "en": "linear solution formula",
      "zh": "一阶线性解公式",
      "definition": "用积分因子表示的线性方程通解。",
      "section": "16.2",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "transient term",
      "zh": "瞬态项",
      "definition": "随自变量增长趋于零、主要影响初始阶段的项。",
      "section": "16.3",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "steady-state value",
      "zh": "稳态值",
      "definition": "长期趋势趋近的平衡值。",
      "section": "16.3",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "Bernoulli differential equation",
      "zh": "Bernoulli微分方程",
      "definition": "y′+P y=Q y^n 形式的非线性方程。",
      "section": "16.2",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "rate-in/rate-out model",
      "zh": "输入率与输出率模型",
      "definition": "净变化率等于流入率减流出率。",
      "section": "16.3",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "mixture problem",
      "zh": "混合问题",
      "definition": "利用流入与流出浓度建立物质总量方程。",
      "section": "16.3",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "Newton's law of cooling",
      "zh": "Newton冷却定律",
      "definition": "温度变化率与物体和环境温差成正比。",
      "section": "16.3",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "resistance model",
      "zh": "阻力模型",
      "definition": "运动阻力与速度或速度平方成正比。",
      "section": "16.3",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "autonomous equation",
      "zh": "自治方程",
      "definition": "右端只依赖因变量、不显含自变量的方程。",
      "section": "16.4",
      "chapter": "16",
      "note": "y′=f(y)"
    },
    {
      "en": "equilibrium point",
      "zh": "平衡点",
      "definition": "使 f(y)=0 且常数解存在的值。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "equilibrium solution",
      "zh": "平衡解",
      "definition": "初值等于平衡点时保持不变的常数解。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "phase line",
      "zh": "相线",
      "definition": "在 y 轴上标出平衡点和解的增减方向。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "stable equilibrium",
      "zh": "稳定平衡",
      "definition": "两侧附近解都趋向该平衡值。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "unstable equilibrium",
      "zh": "不稳定平衡",
      "definition": "至少一侧附近解远离该平衡值。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "semistable equilibrium",
      "zh": "半稳定平衡",
      "definition": "两侧靠近行为不同，一侧趋近、一侧远离。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "concavity diagnostic",
      "zh": "凹凸性判据",
      "definition": "用对 y′ 再求导判断相线曲线的凹凸。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "logistic equation",
      "zh": "logistic方程",
      "definition": "含承载容量的有限制增长自治方程。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "carrying capacity",
      "zh": "承载容量",
      "definition": "logistic 模型中稳定的人口或数量上限。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "harvesting model",
      "zh": "收获模型",
      "definition": "在增长方程中加入持续移除项。",
      "section": "16.4",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "system of first-order equations",
      "zh": "一阶方程组",
      "definition": "多个未知函数的一阶导数由彼此共同决定。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "vector field of a system",
      "zh": "系统向量场",
      "definition": "在状态空间每点给出导数向量。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "phase plane",
      "zh": "相平面",
      "definition": "由两个状态变量张成、显示轨迹的平面。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "trajectory",
      "zh": "轨迹",
      "definition": "系统解在相平面中的曲线。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "critical point of a system",
      "zh": "系统临界点",
      "definition": "使两个变化率同时为零的状态。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "saddle point",
      "zh": "鞍点",
      "definition": "线性化特征值异号时出现的临界点。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "predator-prey system",
      "zh": "捕食者–猎物系统",
      "definition": "两个种群变化率互相耦合的自治系统。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    },
    {
      "en": "competing-species system",
      "zh": "竞争种群系统",
      "definition": "两个种群共享资源、相互抑制的模型。",
      "section": "16.5",
      "chapter": "16",
      "note": ""
    }
  ],
  "exercises": [
    {
      "id": "Q15-01",
      "order": 1,
      "chapter": "15",
      "type": "概念辨析",
      "level": "基础",
      "section": "15.1,15.2",
      "topic": "标量线积分与向量线积分",
      "promptText": "比较 ∫C f ds 与 ∫C F·dr。",
      "prompt": "<p>比较 <code>∫C f ds</code> 与 <code>∫C F·dr</code> 的被积对象、方向和几何意义。</p>",
      "hint": "<p>看一个是弧长元素，另一个是位移向量的点积。</p>",
      "steps": "<p>前者的元素是标量 ds；后者含有有向曲线切向量。</p>",
      "solution": "<p><code>∫C f ds</code> 累积函数值乘弧长，曲线反向不改变结果。<code>∫C F·dr</code> 累积向量场沿切向的分量，曲线反向会使积分变号。前者是标量线积分，后者是向量线积分；只有后者直接解释为 work 或 flow。</p>"
    },
    {
      "id": "Q15-02",
      "order": 2,
      "chapter": "15",
      "type": "计算题",
      "level": "标准",
      "section": "15.1",
      "topic": "直线上的标量线积分",
      "promptText": "计算 ∫C(x+y)ds，C 从(0,0)到(1,2)。",
      "prompt": "<p>计算 <code>∫C(x+y)ds</code>，其中 C 是从 (0,0) 到 (1,2) 的直线段。</p>",
      "hint": "<p>参数化 r(t)=(t,2t)，0≤t≤1。</p>",
      "steps": "<p>r′(t)=(1,2)，ds=√5 dt，x+y=3t。</p>",
      "solution": "<p><code>∫₀¹3t·√5 dt=(3√5)/2</code>。</p>"
    },
    {
      "id": "Q15-03",
      "order": 3,
      "chapter": "15",
      "type": "计算题",
      "level": "基础",
      "section": "15.2",
      "topic": "圆周上的向量线积分",
      "promptText": "F=(x,y)，沿半径2圆逆时针一圈的 ∫F·dr。",
      "prompt": "<p>计算 <code>∫C(x,y)·dr</code>，C 为半径 2、逆时针一周的圆。</p>",
      "hint": "<p>用 r(t)=(2cos t,2sin t)。</p>",
      "steps": "<p>F(r(t))=(2cos t,2sin t)，r′(t)=(−2sin t,2cos t)。</p>",
      "solution": "<p>点积为 <code>−4sin t cos t+4sin t cos t=0</code>，所以积分为 0。</p>"
    },
    {
      "id": "Q15-04",
      "order": 4,
      "chapter": "15",
      "type": "证明/说明",
      "level": "标准",
      "section": "15.3",
      "topic": "势函数与路径独立",
      "promptText": "求 F=(2xy,x²+3y²) 的势函数并算(0,0)→(1,1)线积分。",
      "prompt": "<p>证明 <code>F=(2xy,x²+3y²)</code> 保守，求势函数并计算从 (0,0) 到 (1,1) 的线积分。</p>",
      "hint": "<p>先检验 P_y=Q_x，再由 f_x=P、f_y=Q 复原。</p>",
      "steps": "<p>P_y=2x=Q_x；取 f=x²y+y³。</p>",
      "solution": "<p>势函数为 <code>f=x²y+y³+C</code>。端点差为 <code>f(1,1)−f(0,0)=2</code>，故线积分为 2。</p>"
    },
    {
      "id": "Q15-05",
      "order": 5,
      "chapter": "15",
      "type": "计算题",
      "level": "标准",
      "section": "15.3",
      "topic": "组件检验",
      "promptText": "判断 F=(2xy,x²−y) 是否保守并求势函数。",
      "prompt": "<p>判断 <code>F=(2xy,x²−y)</code> 是否保守；若保守，求势函数。</p>",
      "hint": "<p>比较 P_y 与 Q_x。</p>",
      "steps": "<p>P_y=2x，Q_x=2x；对 x 积分 P 得 x²y+g(y)。</p>",
      "solution": "<p>由对 y 的偏导得 <code>f=x²y−y²/2+C</code>。因此 F=∇f，F 保守。</p>"
    },
    {
      "id": "Q15-06",
      "order": 6,
      "chapter": "15",
      "type": "计算题",
      "level": "基础",
      "section": "15.4",
      "topic": "Green定理与面积",
      "promptText": "用 Green 定理计算单位正方形边界的 ∮x dy−y dx。",
      "prompt": "<p>用 Green 定理计算单位正方形边界的 <code>∮C x dy−y dx</code>，C 取正方向。</p>",
      "hint": "<p>P=−y，Q=x，计算 Q_x−P_y。</p>",
      "steps": "<p>Q_x−P_y=1−(−1)=2。</p>",
      "solution": "<p>区域面积为 1，所以积分为 <code>2A=2</code>。</p>"
    },
    {
      "id": "Q15-07",
      "order": 7,
      "chapter": "15",
      "type": "应用题",
      "level": "标准",
      "section": "15.4",
      "topic": "平面区域的外通量",
      "promptText": "F=(x,y)，求半径2圆上的外法向通量。",
      "prompt": "<p>设 <code>F=(x,y)</code>，求其穿过半径 2 圆周的外法向通量。</p>",
      "hint": "<p>使用 Green 的 flux 形式，div F 为常数。</p>",
      "steps": "<p>div F=2，圆面积为 4π。</p>",
      "solution": "<p>外通量为 <code>2·4π=8π</code>。</p>"
    },
    {
      "id": "Q15-08",
      "order": 8,
      "chapter": "15",
      "type": "计算题",
      "level": "标准",
      "section": "15.5",
      "topic": "圆锥曲面面积",
      "promptText": "求 z=√(x²+y²)，0≤z≤2 的面积。",
      "prompt": "<p>求圆锥面 <code>z=√(x²+y²)</code> 在 <code>0≤z≤2</code> 部分的面积。</p>",
      "hint": "<p>用极坐标；对 f=r，图像面积元素为 √2 r dr dθ。</p>",
      "steps": "<p>投影为 0≤r≤2，0≤θ≤2π。</p>",
      "solution": "<p><code>A=∫₀²π∫₀²√2 r dr dθ=2√2π</code>。</p>"
    },
    {
      "id": "Q15-09",
      "order": 9,
      "chapter": "15",
      "type": "计算题",
      "level": "标准",
      "section": "15.6",
      "topic": "图像曲面上的标量积分",
      "promptText": "计算 ∬S z dσ，S 为 z=1+x+y 在单位正方形上。",
      "prompt": "<p>计算 <code>∬S z dσ</code>，其中 S 是平面 <code>z=1+x+y</code> 在单位正方形上的部分。</p>",
      "hint": "<p>dσ=√3 dxdy，z=1+x+y。</p>",
      "steps": "<p>先积 x、y 各为 <code>1/2+1/2=1</code> 部分，总积分内部为 2。</p>",
      "solution": "<p><code>∬S z dσ=√3∫₀¹∫₀¹(1+x+y)dxdy=2√3</code>。</p>"
    },
    {
      "id": "Q15-10",
      "order": 10,
      "chapter": "15",
      "type": "计算题",
      "level": "基础",
      "section": "15.6",
      "topic": "平面圆盘通量",
      "promptText": "F=(0,0,z)，计算 z=1、r≤1圆盘向上的通量。",
      "prompt": "<p>计算 <code>F=(0,0,z)</code> 穿过圆盘 <code>z=1, x²+y²≤1</code> 向上的通量。</p>",
      "hint": "<p>向上法向 n=(0,0,1)。</p>",
      "steps": "<p>F·n=z=1，面积为 π。</p>",
      "solution": "<p>通量为 <code>π</code>。</p>"
    },
    {
      "id": "Q15-11",
      "order": 11,
      "chapter": "15",
      "type": "证明/说明",
      "level": "挑战",
      "section": "15.7",
      "topic": "Stokes定理",
      "promptText": "F=(−y,x,z)，单位圆盘向上，验证 Stokes。",
      "prompt": "<p>F=(−y,x,z)，S 是 z=0 的单位圆盘且 n 向上。用 Stokes 定理计算边界环量。</p>",
      "hint": "<p>先计算 curl F。</p>",
      "steps": "<p>curl F=(0,0,2)，n=(0,0,1)，曲面积分为 2·π。</p>",
      "solution": "<p>边界 r=(cos t,sin t,0) 逆时针，F·r′=1，故边界积分为 2π，与曲面积分一致。</p>"
    },
    {
      "id": "Q15-12",
      "order": 12,
      "chapter": "15",
      "type": "计算题",
      "level": "标准",
      "section": "15.8",
      "topic": "Divergence定理",
      "promptText": "F=(x,y,z)，求单位球面的外通量。",
      "prompt": "<p>计算 <code>F=(x,y,z)</code> 穿过单位球面的外通量。</p>",
      "hint": "<p>使用 Divergence 定理。</p>",
      "steps": "<p>div F=3，球体积为 4π/3。</p>",
      "solution": "<p>通量等于 <code>3·4π/3=4π</code>。</p>"
    },
    {
      "id": "Q15-13",
      "order": 13,
      "chapter": "15",
      "type": "证明/说明",
      "level": "挑战",
      "section": "15.3,15.7,15.8",
      "topic": "梯度与旋度的恒等式",
      "promptText": "说明 curl(∇f)=0 与 div(curl F)=0 的条件和意义。",
      "prompt": "<p>说明 <code>curl(∇f)=0</code> 与 <code>div(curl F)=0</code> 的条件和几何意义。</p>",
      "hint": "<p>在二阶偏导连续的条件下展开分量。</p>",
      "steps": "<p>第一式分量是混合偏导差；第二式由偏导交换相消。</p>",
      "solution": "<p>梯度的旋度为零说明梯度场保守；旋度的散度为零说明旋度场没有 source 或 sink。两式都要求足够光滑的偏导。</p>"
    },
    {
      "id": "Q15-14",
      "order": 14,
      "chapter": "15",
      "type": "应用题",
      "level": "标准",
      "section": "15.3",
      "topic": "保守力场做功",
      "promptText": "F=(y,x)，计算(0,0)→(2,1)的功。",
      "prompt": "<p>力场 <code>F=(y,x)</code> 从 (0,0) 移动到 (2,1) 做多少功？</p>",
      "hint": "<p>F 的势函数为 xy。</p>",
      "steps": "<p>P_y=1=Q_x，故路径独立。</p>",
      "solution": "<p>W=<code>f(2,1)−f(0,0)=2</code>。</p>"
    },
    {
      "id": "Q15-15",
      "order": 15,
      "chapter": "15",
      "type": "综合题",
      "level": "挑战",
      "section": "15.4",
      "topic": "Green定理双向验证",
      "promptText": "F=(x²−y,x+y²)，验证单位正方形 Green定理。",
      "prompt": "<p>对 <code>F=(x²−y,x+y²)</code> 和单位正方形，用 Green 定理并沿边界直接计算以验证结果。</p>",
      "hint": "<p>curl 分量为 Q_x−P_y。</p>",
      "steps": "<p>Q_x−P_y=1−(−1)=2，二重积分为 2。边界四段分别给 1/3、4/3、2/3、−1/3。</p>",
      "solution": "<p>边界积分和为 2，与内部积分一致。方向是正方形逆时针。</p>"
    },
    {
      "id": "Q16-01",
      "order": 1,
      "chapter": "16",
      "type": "概念辨析",
      "level": "基础",
      "section": "16.1",
      "topic": "阶数与解",
      "promptText": "区分方程阶数、通解和特解。",
      "prompt": "<p>对 <code>y′+2xy=x</code>，说明方程阶数、通解和满足 y(0)=1 的特解分别是什么。</p>",
      "hint": "<p>一阶线性方程；通解由积分因子求，初值用于定常数。</p>",
      "steps": "<p>μ=e^{x²}，得 (e^{x²}y)′=xe^{x²}。</p>",
      "solution": "<p>通解 <code>y=1/2+Ce^{-x²}</code>；初值给 <code>C=1/2</code>，特解 <code>y=(1+e^{-x²})/2</code>。</p>"
    },
    {
      "id": "Q16-02",
      "order": 2,
      "chapter": "16",
      "type": "概念辨析",
      "level": "基础",
      "section": "16.1",
      "topic": "斜率场",
      "promptText": "说明 y′=x−y 在(1,2)处斜率及方向。",
      "prompt": "<p>斜率场 <code>y′=x−y</code> 在点 (1,2) 的短线段斜率和运动方向是什么？</p>",
      "hint": "<p>把点代入右端。</p>",
      "steps": "<p>斜率为 −1。</p>",
      "solution": "<p>解曲线经过 (1,2) 时斜率为 −1；沿 x 增加方向，局部 y 会下降。</p>"
    },
    {
      "id": "Q16-03",
      "order": 3,
      "chapter": "16",
      "type": "计算题",
      "level": "标准",
      "section": "16.1",
      "topic": "Euler法两步",
      "promptText": "y′=x+y,y(0)=1,h=0.1，求两步。",
      "prompt": "<p>用 Euler 法两步求 <code>y′=x+y</code>、<code>y(0)=1</code>、<code>h=0.1</code>。</p>",
      "hint": "<p>注意每步更新 x 与 y 后再计算下一步斜率。</p>",
      "steps": "<p>第一步 y1=1+0.1(1)=1.1；第二步斜率 0.1+1.1=1.2。</p>",
      "solution": "<p><code>y2=1.1+0.1(1.2)=1.22</code>。</p>"
    },
    {
      "id": "Q16-04",
      "order": 4,
      "chapter": "16",
      "type": "计算题",
      "level": "标准",
      "section": "16.2",
      "topic": "一阶线性方程",
      "promptText": "求 y′+y=e^{−x}。",
      "prompt": "<p>求 <code>y′+y=e^{-x}</code> 的通解。</p>",
      "hint": "<p>P=1，积分因子 μ=e^x。</p>",
      "steps": "<p>(e^x y)′=1。</p>",
      "solution": "<p><code>y=e^{-x}(x+C)</code>。</p>"
    },
    {
      "id": "Q16-05",
      "order": 5,
      "chapter": "16",
      "type": "计算题",
      "level": "基础",
      "section": "16.2",
      "topic": "线性初值问题",
      "promptText": "解 y′+2y=4，y(0)=0。",
      "prompt": "<p>求解 <code>y′+2y=4</code>，<code>y(0)=0</code>。</p>",
      "hint": "<p>齐次解加常数特解。</p>",
      "steps": "<p>y=Ce^{−2x}+2；初值给 C=−2。</p>",
      "solution": "<p><code>y=2(1-e^{-2x})</code>。</p>"
    },
    {
      "id": "Q16-06",
      "order": 6,
      "chapter": "16",
      "type": "应用题",
      "level": "标准",
      "section": "16.3",
      "topic": "混合问题",
      "promptText": "100L槽，0.1kg/L流入2L/min，等速流出，求y(t)。",
      "prompt": "<p>槽中有 100 L 盐水，流入浓度 0.1 kg/L、流量 2 L/min，混合液以相同流量流出。初始溶质为 0，求 <code>y(t)</code>。</p>",
      "hint": "<p>输入率 0.2 kg/min，输出率 0.02y。</p>",
      "steps": "<p>y′=0.2−0.02y，平衡值为 10。</p>",
      "solution": "<p><code>y(t)=10(1-e^{-0.02t})</code> kg，长期趋近 10 kg。</p>"
    },
    {
      "id": "Q16-07",
      "order": 7,
      "chapter": "16",
      "type": "应用题",
      "level": "标准",
      "section": "16.3",
      "topic": "Newton冷却",
      "promptText": "环境20°C，T(0)=90，T(10)=70，写T(t)。",
      "prompt": "<p>按 Newton 冷却定律，环境温度 20°C，<code>T(0)=90°C</code>，<code>T(10)=70°C</code>。确定温度函数的结构。</p>",
      "hint": "<p>写成 T−20=(T0−20)e^{kt}。</p>",
      "steps": "<p>由 T(10)=70 得 50=70e^{10k}。</p>",
      "solution": "<p><code>T(t)=20+70e^{kt}</code>，其中 <code>k=(1/10)ln(5/7)</code>，所以温度递减并趋近 20°C。</p>"
    },
    {
      "id": "Q16-08",
      "order": 8,
      "chapter": "16",
      "type": "概念辨析",
      "level": "基础",
      "section": "16.4",
      "topic": "相线稳定性",
      "promptText": "分析 y′=y(1−y)。",
      "prompt": "<p>画 <code>y′=y(1-y)</code> 的相线并判断 y=0、y=1 的稳定性。</p>",
      "hint": "<p>检查区间 (−∞,0)、(0,1)、(1,∞) 的符号。</p>",
      "steps": "<p>y<0 时 y′<0；0<y<1 时 y′>0；y>1 时 y′<0。</p>",
      "solution": "<p>y=0 不稳定，y=1 稳定；这是承载容量为 1 的 logistic 方程。</p>"
    },
    {
      "id": "Q16-09",
      "order": 9,
      "chapter": "16",
      "type": "计算题",
      "level": "挑战",
      "section": "16.4",
      "topic": "logistic初值解",
      "promptText": "解 y′=0.2y(1−y/50)，y(0)=10。",
      "prompt": "<p>求解 <code>y′=0.2y(1-y/50)</code>，<code>y(0)=10</code>。</p>",
      "hint": "<p>用 logistic 通式 y=M/(1+Ae^{−kt})。</p>",
      "steps": "<p>M=50，k=0.2；10=50/(1+A)，A=4。</p>",
      "solution": "<p><code>y(t)=50/(1+4e^{-0.2t})</code>，从 10 单调趋近 50。</p>"
    },
    {
      "id": "Q16-10",
      "order": 10,
      "chapter": "16",
      "type": "计算题",
      "level": "标准",
      "section": "16.5",
      "topic": "鞍点系统",
      "promptText": "分析 x′=x,y′=−y 的轨迹与稳定性。",
      "prompt": "<p>分析系统 <code>x′=x, y′=-y</code> 的平衡点、轨迹和稳定性。</p>",
      "hint": "<p>分别解出 x=C1e^t、y=C2e^{-t}。</p>",
      "steps": "<p>消去参数得 xy=C。</p>",
      "solution": "<p>原点是鞍点：一个方向远离、一个方向趋近，因此不稳定。</p>"
    },
    {
      "id": "Q16-11",
      "order": 11,
      "chapter": "16",
      "type": "计算题",
      "level": "标准",
      "section": "16.5",
      "topic": "中心型线性系统",
      "promptText": "分析 x′=y,y′=−x。",
      "prompt": "<p>求系统 <code>x′=y, y′=-x</code> 的解并判断原点的类型。</p>",
      "hint": "<p>化为 x″+x=0。</p>",
      "steps": "<p>特征值为 ±i。</p>",
      "solution": "<p><code>x=C1cos t+C2sin t, y=-C1sin t+C2cos t</code>；轨迹为圆心在原点的圆或椭圆，原点是中心。</p>"
    },
    {
      "id": "Q16-12",
      "order": 12,
      "chapter": "16",
      "type": "计算题",
      "level": "挑战",
      "section": "16.5",
      "topic": "非线性系统平衡点",
      "promptText": "求 x′=x(2−x−y), y′=y(1−x) 的平衡点。",
      "prompt": "<p>求 <code>x′=x(2-x-y), y′=y(1-x)</code> 的全部平衡点。</p>",
      "hint": "<p>分别讨论 y=0 与 x=1 两种使 y′=0 的情形，再代回 x′=0。</p>",
      "steps": "<p>若 y=0，则 x=0 或 x=2；若 x=1，则 y=1。</p>",
      "solution": "<p>平衡点为 <code>(0,0)</code>、<code>(2,0)</code>、<code>(1,1)</code>。点 <code>(0,2)</code> 使 <code>y′=2</code>，不是平衡点。稳定性还需进一步线性化。</p>"
    },
    {
      "id": "Q16-13",
      "order": 13,
      "chapter": "16",
      "type": "证明/说明",
      "level": "挑战",
      "section": "16.2",
      "topic": "齐次线性叠加",
      "promptText": "证明齐次线性方程解的叠加。",
      "prompt": "<p>证明：若 <code>y1,y2</code> 都满足 <code>y′+P(x)y=0</code>，则任意线性组合也满足该方程。</p>",
      "hint": "<p>把组合代入左侧。</p>",
      "steps": "<p>(C1y1+C2y2)′+P(C1y1+C2y2)=C1(y1′+Py1)+C2(y2′+Py2)。</p>",
      "solution": "<p>两个括号均为 0，所以组合也满足方程；这体现齐次线性方程解空间的叠加性。</p>"
    },
    {
      "id": "Q16-14",
      "order": 14,
      "chapter": "16",
      "type": "应用题",
      "level": "标准",
      "section": "16.3",
      "topic": "冷却长期行为",
      "promptText": "T′=k(20−T),k<0，说明解如何变化。",
      "prompt": "<p>模型为 <code>T′=k(20-T)</code>，环境 20°C，<code>k&lt;0</code>。比较初始 10°C 和 90°C 的长期行为。</p>",
      "hint": "<p>把差值 T−20 看作指数变化。</p>",
      "steps": "<p>T−20 的导数等于 k(T−20)。</p>",
      "solution": "<p>无论初始高于还是低于 20°C，温度都单调趋近 20°C；k<0 使温差绝对值衰减。</p>"
    },
    {
      "id": "Q16-15",
      "order": 15,
      "chapter": "16",
      "type": "综合题",
      "level": "挑战",
      "section": "16.2",
      "topic": "变系数线性初值问题",
      "promptText": "解 y′+y/t=3t,t>0,y(1)=0。",
      "prompt": "<p>求解 <code>y′+y/t=3t</code>（t&gt;0），<code>y(1)=0</code>。</p>",
      "hint": "<p>P=1/t，积分因子为 t。</p>",
      "steps": "<p>(ty)′=3t²，故 ty=t³+C。</p>",
      "solution": "<p><code>y=t²+C/t</code>；y(1)=0 得 C=−1，所以 <code>y=t²−1/t</code>。</p>"
    }
  ]
};
