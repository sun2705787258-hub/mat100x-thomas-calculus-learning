window.BATCH_FORMULAS = {
  "b7-partials":
    "\\begin{aligned}f_x(a,b)&=\\lim_{h\\to0}\\frac{f(a+h,b)-f(a,b)}h\\\\ f_y(a,b)&=\\lim_{h\\to0}\\frac{f(a,b+h)-f(a,b)}h\\end{aligned}",
  "b7-differentiability":
    "\\begin{aligned}\\Delta z&=f_x(a,b)\\Delta x+f_y(a,b)\\Delta y\\\\ &\\quad+\\varepsilon_1\\Delta x+\\varepsilon_2\\Delta y\\\\ \\varepsilon_1,\\varepsilon_2&\\to0\\quad\\text{as }\\Delta x,\\Delta y\\to0\\end{aligned}",
  "b7-mixed":
    "f_{xy}(a,b)=f_{yx}(a,b)\\quad\\text{when the required mixed partials are continuous}",
  "b7-chain":
    "\\frac{dw}{dt}=\\frac{\\partial f}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial f}{\\partial y}\\frac{dy}{dt}+\\frac{\\partial f}{\\partial z}\\frac{dz}{dt}",
  "b7-gradient-directional":
    "\\begin{aligned}\\nabla f&=f_x\\mathbf i+f_y\\mathbf j+f_z\\mathbf k\\\\ D_{\\mathbf u}f&=\\nabla f\\cdot\\mathbf u,\\qquad |\\mathbf u|=1\\end{aligned}",
  "b7-gradient-max":
    "\\begin{aligned}\\max_{\\mathbf u}D_{\\mathbf u}f&=|\\nabla f|\\\\ \\mathbf u_{\\max}&=\\frac{\\nabla f}{|\\nabla f|}\\end{aligned}",
  "b7-implicit-partial":
    "\\frac{\\partial z}{\\partial x}=-\\frac{F_x}{F_z},\\qquad \\frac{\\partial z}{\\partial y}=-\\frac{F_y}{F_z},\\qquad F_z\\ne0",
  "b7-tangent-plane-level":
    "f_x(P_0)(x-x_0)+f_y(P_0)(y-y_0)+f_z(P_0)(z-z_0)=0",
  "b7-tangent-plane-graph":
    "z=z_0+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)",
  "b7-linearization":
    "L(x,y)=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)",
  "b7-total-differential":
    "df=f_x(x_0,y_0)\\,dx+f_y(x_0,y_0)\\,dy",
  "b7-second-test":
    "\\begin{aligned}D&=f_{xx}f_{yy}-f_{xy}^2\\\\ D>0,f_{xx}<0&:\\ \\text{local maximum}\\\\ D>0,f_{xx}>0&:\\ \\text{local minimum}\\\\ D<0&:\\ \\text{saddle point}\\\\ D=0&:\\ \\text{inconclusive}\\end{aligned}",
  "b7-lagrange":
    "\\nabla f=\\lambda\\nabla g,\\qquad g(x,y,z)=0",
  "b7-taylor-quadratic":
    "\\begin{aligned}Q(a+h,b+k)&=f(a,b)+hf_x+kf_y\\\\ &\\quad+\\frac12(h^2f_{xx}+2hkf_{xy}+k^2f_{yy})\\end{aligned}",
  "b7-constrained-partial":
    "\\left(\\frac{\\partial w}{\\partial x}\\right)_{y,z}",
  "b7-double-riemann":
    "\\iint_R f(x,y)\\,dA=\\lim_{\\|P\\|\\to0}\\sum_{k=1}^{n}f(x_k,y_k)\\Delta A_k",
  "b7-fubini-rect":
    "\\begin{aligned}\\iint_R f\\,dA&=\\int_c^d\\int_a^b f(x,y)\\,dx\\,dy\\\\ &=\\int_a^b\\int_c^d f(x,y)\\,dy\\,dx\\end{aligned}",
  "b7-fubini-general":
    "\\begin{aligned}\\iint_R f\\,dA&=\\int_a^b\\int_{g_1(x)}^{g_2(x)}f(x,y)\\,dy\\,dx\\\\ &=\\int_c^d\\int_{h_1(y)}^{h_2(y)}f(x,y)\\,dx\\,dy\\end{aligned}",
  "b7-area-double":
    "A(R)=\\iint_R1\\,dA",
  "b7-average-double":
    "\\operatorname{av}(f)=\\frac1{A(R)}\\iint_R f(x,y)\\,dA",
  "b7-polar-element":
    "x=r\\cos\\theta,\\quad y=r\\sin\\theta,\\quad dA=r\\,dr\\,d\\theta",
  "b7-polar-integral":
    "\\iint_R f(x,y)\\,dA=\\int_\\alpha^\\beta\\int_{r_1(\\theta)}^{r_2(\\theta)}f(r\\cos\\theta,r\\sin\\theta)\\,r\\,dr\\,d\\theta",
  "b7-triple-riemann":
    "\\iiint_D F(x,y,z)\\,dV=\\lim_{\\|P\\|\\to0}\\sum_{k=1}^{n}F(x_k,y_k,z_k)\\Delta V_k",
  "b7-triple-iterated":
    "\\iiint_D F\\,dV=\\int_a^b\\int_{g_1(x)}^{g_2(x)}\\int_{f_1(x,y)}^{f_2(x,y)}F(x,y,z)\\,dz\\,dy\\,dx",
  "b7-volume-triple":
    "V(D)=\\iiint_D1\\,dV",
  "b7-average-triple":
    "\\operatorname{av}(F)=\\frac1{V(D)}\\iiint_D F(x,y,z)\\,dV",
  "b7-mass-centroid":
    "\\begin{aligned}M&=\\iiint_D\\delta\\,dV\\\\ M_{yz}&=\\iiint_Dx\\delta\\,dV,\\quad \\bar x=\\frac{M_{yz}}M\\end{aligned}",
  "b7-moment-inertia":
    "I_0=\\iiint_D(x^2+y^2)\\delta(x,y,z)\\,dV",
  "b7-joint-density":
    "f(x,y)\\ge0,\\qquad \\int_{-\\infty}^{\\infty}\\int_{-\\infty}^{\\infty}f(x,y)\\,dx\\,dy=1",
  "b7-cylindrical-coords":
    "x=r\\cos\\theta,\\quad y=r\\sin\\theta,\\quad z=z,\\quad dV=dz\\,r\\,dr\\,d\\theta",
  "b7-cylindrical-integral":
    "\\iiint_D F\\,dV=\\int_{\\theta_1}^{\\theta_2}\\int_{r_1(\\theta)}^{r_2(\\theta)}\\int_{z_1(r,\\theta)}^{z_2(r,\\theta)}F(r,\\theta,z)\\,r\\,dz\\,dr\\,d\\theta",
  "b7-spherical-coords":
    "x=\\rho\\sin\\phi\\cos\\theta,\\quad y=\\rho\\sin\\phi\\sin\\theta,\\quad z=\\rho\\cos\\phi",
  "b7-spherical-integral":
    "\\iiint_D F\\,dV=\\int_{\\theta_1}^{\\theta_2}\\int_{\\phi_1}^{\\phi_2}\\int_{\\rho_1}^{\\rho_2}F\\,\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta",
  "b7-jacobian":
    "J(u,v)=\\frac{\\partial(x,y)}{\\partial(u,v)}=\\begin{vmatrix}x_u&x_v\\\\y_u&y_v\\end{vmatrix}",
  "b7-double-substitution":
    "\\iint_R f(x,y)\\,dx\\,dy=\\iint_G f(g(u,v),h(u,v))\\,|J(u,v)|\\,du\\,dv",
  "b7-triple-substitution":
    "\\iiint_D F(x,y,z)\\,dx\\,dy\\,dz=\\iiint_G F(g,h,k)\\,|J(u,v,w)|\\,du\\,dv\\,dw",
};

window.STUDY_CONTENT = {
  terms: [
    { en:"function of several variables", zh:"多元函数", definition:"把多个实数组成的有序组映到唯一实数的函数；需明确定义域与自变量。", section:"13.1", chapter:"13", note:"z=f(x,y)" },
    { en:"domain in the plane", zh:"平面定义域", definition:"使 f(x,y) 有定义的平面点集；边界、开闭性与有界性决定后续极限和极值讨论。", section:"13.1", chapter:"13", note:"D\\subset\\mathbb R^2" },
    { en:"graph surface", zh:"函数图像曲面", definition:"函数 z=f(x,y) 在空间中的图像 {(x,y,f(x,y))}。", section:"13.1", chapter:"13", note:"z=f(x,y)" },
    { en:"level curve", zh:"等高线", definition:"二元函数取固定值的平面点集 f(x,y)=c。", section:"13.1", chapter:"13", note:"f(x,y)=c" },
    { en:"level surface", zh:"等值面", definition:"三元函数取固定值 f(x,y,z)=c 的空间曲面。", section:"13.1", chapter:"13", note:"f(x,y,z)=c" },
    { en:"interior point", zh:"内点", definition:"以该点为中心存在完全包含在区域内的圆盘或球。", section:"13.1", chapter:"13", note:"open neighborhood stays inside R" },
    { en:"boundary point", zh:"边界点", definition:"任意小邻域都同时与区域及其外部相交的点。", section:"13.1", chapter:"13", note:"neighbors on both sides" },
    { en:"open region", zh:"开区域", definition:"不包含任何边界点的区域。", section:"13.1", chapter:"13", note:"R contains no boundary" },
    { en:"closed region", zh:"闭区域", definition:"包含全部边界点的区域。", section:"13.1", chapter:"13", note:"closure included" },
    { en:"bounded region", zh:"有界区域", definition:"能被一个有限半径圆盘或球包含的区域。", section:"13.1", chapter:"13", note:"finite extent" },
    { en:"limit of a multivariable function", zh:"多元函数极限", definition:"当点从任意方向接近目标点时，函数值都必须接近同一 L。", section:"13.2", chapter:"13", note:"\\lim_{(x,y)\\to(a,b)}f(x,y)=L" },
    { en:"path dependence", zh:"路径依赖", definition:"沿不同路径趋向同一点得到不同极限，从而证明多元极限不存在。", section:"13.2", chapter:"13", note:"two paths, different limits" },
    { en:"continuity of a multivariable function", zh:"多元函数连续性", definition:"函数值存在、极限存在且极限等于函数值。", section:"13.2", chapter:"13", note:"\\lim f=f(a,b)" },
    { en:"partial derivative", zh:"偏导数", definition:"保持其余自变量不变，对某一个自变量求普通导数。", section:"13.3", chapter:"13", note:"f_x,\\ f_y,\\ f_z" },
    { en:"first partial derivatives", zh:"一阶偏导数", definition:"函数对各独立变量分别求导所得的一阶导数函数。", section:"13.3", chapter:"13", note:"gradient components" },
    { en:"second-order partial derivative", zh:"二阶偏导数", definition:"对某个一阶偏导数再次关于一个变量求偏导。", section:"13.3", chapter:"13", note:"f_{xx},f_{xy},f_{yx},f_{yy}" },
    { en:"mixed partial derivative", zh:"混合偏导数", definition:"先后关于不同变量求偏导，例如 f_xy。", section:"13.3", chapter:"13", note:"order matters unless continuity conditions hold" },
    { en:"higher-order partial derivative", zh:"高阶偏导数", definition:"对偏导函数继续求偏导所得的三阶或更高阶导数。", section:"13.3", chapter:"13", note:"f_{xxy}" },
    { en:"differentiability of a function of two variables", zh:"二元函数可微", definition:"函数增量可由两个一阶偏导的线性部分加 o(√(Δx²+Δy²)) 的误差表示。", section:"13.3", chapter:"13", note:"linear approximation dominates remainder" },
    { en:"increment theorem", zh:"增量定理", definition:"连续的一阶偏导保证函数在邻域内可微并可线性近似。", section:"13.3", chapter:"13", note:"continuous partials ⇒ differentiable" },
    { en:"differentiability implies continuity", zh:"可微蕴含连续", definition:"多元函数在一点可微时，在该点必连续；反之不成立。", section:"13.3", chapter:"13", note:"the converse fails" },
    { en:"chain rule", zh:"多元链式法则", definition:"复合函数的导数等于外层各偏导乘以内层对相应变量的导数之和。", section:"13.4", chapter:"13", note:"sum over dependency paths" },
    { en:"dependency diagram", zh:"变量依赖图", definition:"把独立、中间和依赖变量画成路径，帮助组织多元链式法则。", section:"13.4", chapter:"13", note:"multiply along paths, add results" },
    { en:"implicit differentiation formula", zh:"隐函数求导公式", definition:"F(x,y,z)=0 且 F_z≠0 时，用偏导比值求 z_x、z_y。", section:"13.4", chapter:"13", note:"z_x=-F_x/F_z" },
    { en:"directional derivative", zh:"方向导数", definition:"函数沿单位方向 u 的变化率。", section:"13.5", chapter:"13", note:"D_uf=\\nabla f\\cdot u" },
    { en:"gradient vector", zh:"梯度向量", definition:"由一阶偏导组成的向量，指向局部增长最快方向。", section:"13.5", chapter:"13", note:"\\nabla f" },
    { en:"steepest ascent", zh:"最速上升方向", definition:"在一点使方向导数取最大正值的单位方向，即梯度方向。", section:"13.5", chapter:"13", note:"u=\\nabla f/|\\nabla f|" },
    { en:"steepest descent", zh:"最速下降方向", definition:"使方向导数取最小值的单位方向，即负梯度方向。", section:"13.5", chapter:"13", note:"u=-\\nabla f/|\\nabla f|" },
    { en:"level-curve normal", zh:"等高线法向", definition:"梯度垂直于过该点的等高线切线。", section:"13.5", chapter:"13", note:"\\nabla f\\perp tangent" },
    { en:"derivative along a path", zh:"沿路径导数", definition:"对复合函数 f(r(t)) 求导，等于梯度与 r′(t) 的点积。", section:"13.5", chapter:"13", note:"d/dt f(r(t))" },
    { en:"tangent plane to a level surface", zh:"等值面切平面", definition:"过点 P₀ 且以该点梯度为法向量的平面。", section:"13.6", chapter:"13", note:"\\nabla f(P_0)\\cdot(r-r_0)=0" },
    { en:"normal line", zh:"法线", definition:"过曲面点并沿梯度方向的空间直线。", section:"13.6", chapter:"13", note:"r=r_0+t\\nabla f" },
    { en:"tangent plane to z=f(x,y)", zh:"函数图像切平面", definition:"用两个一阶偏导给出 z 方向的局部线性近似平面。", section:"13.6", chapter:"13", note:"z=z_0+f_xΔx+f_yΔy" },
    { en:"linearization", zh:"线性化", definition:"用切平面函数 L(x,y) 在一点附近近似 f(x,y)。", section:"13.6", chapter:"13", note:"f(x,y)\\approx L(x,y)" },
    { en:"total differential", zh:"全微分", definition:"由各偏导数乘自变量微分相加得到的局部变化线性主部。", section:"13.6", chapter:"13", note:"df=f_xdx+f_ydy" },
    { en:"local maximum / minimum", zh:"局部极大 / 极小", definition:"在点的某个邻域内函数值最大或最小。", section:"13.7", chapter:"13", note:"nearby comparison only" },
    { en:"absolute maximum / minimum", zh:"绝对极大 / 极小", definition:"在整个指定区域上函数值最大或最小。", section:"13.7", chapter:"13", note:"global comparison" },
    { en:"critical point", zh:"临界点", definition:"内点处两个一阶偏导同时为零，或至少一个偏导不存在。", section:"13.7", chapter:"13", note:"\\nabla f=0 or derivative fails" },
    { en:"saddle point", zh:"鞍点", definition:"临界点附近同时存在比该点函数值更大和更小的点。", section:"13.7", chapter:"13", note:"D<0 for C² functions" },
    { en:"Second Derivative Test for two variables", zh:"二元二阶导数判别法", definition:"用 f_xx 与 Hessian 行列式 D 判断局部极大、极小、鞍点或不确定。", section:"13.7", chapter:"13", note:"D=f_{xx}f_{yy}-f_{xy}^2" },
    { en:"discriminant / Hessian", zh:"判别式 / Hessian", definition:"二阶偏导矩阵的行列式，用于分类二元临界点。", section:"13.7", chapter:"13", note:"H=f_{xx}f_{yy}-f_{xy}^2" },
    { en:"boundary extrema", zh:"边界极值", definition:"在区域边界上用一维参数化或端点比较寻找的极值候选。", section:"13.7", chapter:"13", note:"interior + boundary" },
    { en:"Lagrange multiplier", zh:"拉格朗日乘数", definition:"约束极值中连接目标梯度与约束梯度的标量 λ。", section:"13.8", chapter:"13", note:"\\nabla f=\\lambda\\nabla g" },
    { en:"constraint equation", zh:"约束方程", definition:"限制变量所在集合的方程，如 g(x,y,z)=c。", section:"13.8", chapter:"13", note:"g=c" },
    { en:"Lagrange equations", zh:"拉格朗日方程组", definition:"由梯度平行条件和约束方程组成的临界点方程组。", section:"13.8", chapter:"13", note:"\\nabla f=\\lambda\\nabla g,\\ g=c" },
    { en:"Orthogonal Gradient Theorem", zh:"正交梯度定理", definition:"约束曲线上极值点的 ∇f 必与 ∇g 平行。", section:"13.8", chapter:"13", note:"gradients are parallel" },
    { en:"Taylor formula for two variables", zh:"二元 Taylor 公式", definition:"用偏导、增量算子与余项展开 f(a+h,b+k)。", section:"13.9", chapter:"13", note:"multivariate Taylor formula" },
    { en:"quadratic approximation", zh:"二次近似", definition:"在中心点使用常数、一次与二阶偏导项近似二元函数。", section:"13.9", chapter:"13", note:"Q(a+h,b+k)" },
    { en:"constrained partial derivative", zh:"约束偏导数", definition:"在指定其他变量独立时，沿约束关系变化的偏导。", section:"13.10", chapter:"13", note:"(∂w/∂x)_{y,z}" },
    { en:"dependent and independent variables", zh:"依赖变量与独立变量", definition:"约束系统中需先指定哪些变量自由、哪些由方程决定；不同选择会给出不同偏导含义。", section:"13.10", chapter:"13", note:"choose before differentiating" },

    { en:"double integral", zh:"二重积分", definition:"二元函数在平面区域上的面积元累加极限，可表示带符号体积。", section:"14.1", chapter:"14", note:"\\iint_R f\\,dA" },
    { en:"area element", zh:"面积元素", definition:"平面区域的小面积微元 dA，在直角坐标中常写 dx dy。", section:"14.1", chapter:"14", note:"dA=dx\\,dy" },
    { en:"double Riemann sum", zh:"二重 Riemann 和", definition:"在若干小区域中取样本点，将函数值乘面积后求和。", section:"14.1", chapter:"14", note:"\\sum f(x_k,y_k)\\Delta A_k" },
    { en:"integrability", zh:"可积性", definition:"所有足够细分及允许样本点都给出同一积分极限。", section:"14.1", chapter:"14", note:"norm of partition \\to0" },
    { en:"Fubini's Theorem", zh:"Fubini 定理", definition:"在适当连续条件下，多重积分可写成不同次序的迭代积分。", section:"14.1–14.2", chapter:"14", note:"iterate one variable at a time" },
    { en:"iterated integral", zh:"累次积分", definition:"按指定次序逐层求定积分。", section:"14.1", chapter:"14", note:"inside limits may depend on outer variable" },
    { en:"type I region", zh:"I 型区域", definition:"x 在常数区间内，y 的上下限由 x 的两个函数给出。", section:"14.2", chapter:"14", note:"a\\le x\\le b,\\ g_1(x)\\le y\\le g_2(x)" },
    { en:"type II region", zh:"II 型区域", definition:"y 在常数区间内，x 的左右限由 y 的两个函数给出。", section:"14.2", chapter:"14", note:"c\\le y\\le d,\\ h_1(y)\\le x\\le h_2(y)" },
    { en:"stronger form of Fubini", zh:"Fubini 定理强形式", definition:"允许内层积分上下限依赖外层变量的迭代积分版本。", section:"14.2", chapter:"14", note:"general region limits" },
    { en:"reversing the order of integration", zh:"交换积分次序", definition:"重画区域，把 dx dy 改为 dy dx 并重写上下限。", section:"14.2", chapter:"14", note:"sketch before changing order" },
    { en:"area by double integration", zh:"用二重积分求面积", definition:"区域面积等于常数函数 1 在该区域上的二重积分。", section:"14.3", chapter:"14", note:"A=\\iint_R1\\,dA" },
    { en:"average value over a region", zh:"区域平均值", definition:"函数区域积分除以区域面积。", section:"14.3", chapter:"14", note:"av(f)=1/A(R)\\iint f\\,dA" },
    { en:"polar area element", zh:"极坐标面积元素", definition:"极坐标中小扇环的面积为 r dr dθ。", section:"14.4", chapter:"14", note:"dA=r\\,dr\\,dθ" },
    { en:"polar double integral", zh:"极坐标二重积分", definition:"把被积函数与区域转换到 (r,θ) 后的二重积分。", section:"14.4", chapter:"14", note:"r must be included" },
    { en:"triple integral", zh:"三重积分", definition:"三元函数在空间区域上的体积元累加极限。", section:"14.5", chapter:"14", note:"\\iiint_D F\\,dV" },
    { en:"volume element", zh:"体积元素", definition:"空间区域的小体积微元 dV，在直角坐标中为 dx dy dz。", section:"14.5", chapter:"14", note:"dV=dx\\,dy\\,dz" },
    { en:"triple iterated integral", zh:"三重累次积分", definition:"沿 z、y、x 次序逐层积分的形式。", section:"14.5", chapter:"14", note:"inside limits depend on other variables" },
    { en:"volume by triple integral", zh:"用三重积分求体积", definition:"空间区域体积为 1 在该区域上的三重积分。", section:"14.5", chapter:"14", note:"V=\\iiint_D1\\,dV" },
    { en:"average over a solid", zh:"空间区域平均值", definition:"函数在立体上的积分除以立体体积。", section:"14.5", chapter:"14", note:"av(F)=1/V(D)\\iiint F\\,dV" },
    { en:"density", zh:"密度", definition:"单位面积或体积的质量分布；空间问题中常用 δ(x,y,z)。", section:"14.6", chapter:"14", note:"mass per unit measure" },
    { en:"mass by multiple integration", zh:"多重积分质量", definition:"质量等于密度对面积或体积元的积分。", section:"14.6", chapter:"14", note:"M=\\iiint\\delta\\,dV" },
    { en:"first moment", zh:"一阶矩", definition:"坐标乘质量元素后的积分，用于确定质心。", section:"14.6", chapter:"14", note:"M_{yz}=\\iiint x\\delta\\,dV" },
    { en:"center of mass", zh:"质心", definition:"由一阶矩除以总质量得到的平均位置。", section:"14.6", chapter:"14", note:"\\bar x=M_{yz}/M" },
    { en:"moment of inertia", zh:"转动惯量", definition:"质量元素乘到轴距离平方后的积分。", section:"14.6", chapter:"14", note:"I_0=\\iiint(x^2+y^2)\\delta\\,dV" },
    { en:"joint probability density", zh:"联合概率密度", definition:"二元非负函数，在平面上的总积分为 1。", section:"14.6", chapter:"14", note:"\\iint f\\,dA=1" },
    { en:"expected value", zh:"期望值", definition:"随机变量乘联合概率密度后的积分。", section:"14.6", chapter:"14", note:"E(X)=\\iint x f(x,y)\\,dA" },
    { en:"cylindrical coordinates", zh:"柱坐标", definition:"用平面极坐标 (r,θ) 加竖直坐标 z 表示空间点。", section:"14.7", chapter:"14", note:"(r,\\theta,z)" },
    { en:"cylindrical volume element", zh:"柱坐标体积元素", definition:"柱坐标中的小体积微元 dV=r dz dr dθ。", section:"14.7", chapter:"14", note:"dV=r\\,dz\\,dr\\,dθ" },
    { en:"spherical coordinates", zh:"球坐标", definition:"用 ρ、φ、θ 表示点；ρ 为原点到点距离，φ 为与正 z 轴夹角。", section:"14.7", chapter:"14", note:"(\\rho,\\phi,\\theta)" },
    { en:"spherical volume element", zh:"球坐标体积元素", definition:"球坐标小楔的体积微元 dV=ρ² sinφ dρ dφ dθ。", section:"14.7", chapter:"14", note:"must include \\rho^2\\sin\\phi" },
    { en:"coordinate transformation", zh:"坐标变换", definition:"由 (u,v) 或 (u,v,w) 到 (x,y) 或 (x,y,z) 的可微映射。", section:"14.8", chapter:"14", note:"T:G\\to R" },
    { en:"preimage and image", zh:"原像与像", definition:"变换前的参数区域与变换后的实际积分区域。", section:"14.8", chapter:"14", note:"G\\mapsto R" },
    { en:"Jacobian", zh:"Jacobian 行列式", definition:"坐标变换局部面积或体积缩放因子。", section:"14.8", chapter:"14", note:"J=\\partial(x,y)/\\partial(u,v)" },
    { en:"one-to-one transformation", zh:"一一变换", definition:"不同参数点内部对应不同像点，保证变量替换不重复计区域。", section:"14.8", chapter:"14", note:"interior one-to-one" },
    { en:"double integral substitution", zh:"二重积分换元", definition:"用雅可比绝对值 |J| 把 xy 区域上的积分转换成 uv 区域。", section:"14.8", chapter:"14", note:"dx dy=|J|du dv" },
    { en:"triple integral substitution", zh:"三重积分换元", definition:"用三维 Jacobian 绝对值把空间区域积分转换成参数区域。", section:"14.8", chapter:"14", note:"dV=|J|du dv dw" },
  ],

  exercises: [
    { id:"Q13-01", order:1, chapter:"13", type:"概念辨析", level:"基础", section:"13.1", topic:"定义域与等高线", promptText:"f=√(9−x²−y²) 的定义域、值域和等高线。", prompt:"<p>求 <code>f(x,y)=√(9−x²−y²)</code> 的定义域、值域，并描述等高线。</p>", hint:"<p>根号内非负；令 f=c 后两边平方。</p>", steps:"<p>定义域 x²+y²≤9；值域 [0,3]；等高线是同心圆。</p>", solution:"<p>定义域为圆盘 <code>x²+y²≤9</code>。平方根输出位于 [0,3]。令 <code>√(9−x²−y²)=c</code>，得 <code>x²+y²=9−c²</code>。当 0≤c≤3 时是半径 <code>√(9−c²)</code> 的圆；c=3 时退化为原点。</p>" },
    { id:"Q13-02", order:2, chapter:"13", type:"证明/说明", level:"挑战", section:"13.2", topic:"路径判断极限不存在", promptText:"证明 x²y/(x⁴+y²) 在原点无极限。", prompt:"<p>证明 <code>f(x,y)=x²y/(x⁴+y²)</code> 在 (0,0) 处无极限。</p>", hint:"<p>比较 y=0 与 y=x² 两条路径。</p>", steps:"<p>y=0 时恒为0；沿 y=x² 得 x⁴/(2x⁴)=1/2。</p>", solution:"<p>沿 y=0（x≠0），f(x,0)=0，所以路径极限为0。沿 y=x²，<code>f(x,x²)=x⁴/(x⁴+x⁴)=1/2</code>，路径极限为1/2。两条合法路径给出不同结果，故二元极限不存在。</p>" },
    { id:"Q13-03", order:3, chapter:"13", type:"计算题", level:"基础", section:"13.3", topic:"一阶偏导", promptText:"f=x²y+e^{xy} 在 (1,0) 的 fx、fy。", prompt:"<p>设 <code>f(x,y)=x²y+e^{xy}</code>，求 (1,0) 处的 <code>f_x</code>、<code>f_y</code>。</p>", hint:"<p>对 x 求导时把 y 当常数，反之亦然；指数项用链式法则。</p>", steps:"<p>f_x=2xy+ye^{xy}; f_y=x²+xe^{xy}。</p>", solution:"<p><code>f_x=2xy+ye^{xy}</code>，在 (1,0) 得 0。</p><p><code>f_y=x²+xe^{xy}</code>，在 (1,0) 得 <code>1+1=2</code>。</p>" },
    { id:"Q13-04", order:4, chapter:"13", type:"证明/说明", level:"挑战", section:"13.3", topic:"偏导与可微", promptText:"判断 f=xy/√(x²+y²) 在原点的连续性与可微性。", prompt:"<p>定义 <code>f(x,y)=xy/√(x²+y²)</code>（(x,y)≠(0,0)），f(0,0)=0。证明它在原点连续，并判断是否可微。</p>", hint:"<p>极坐标中 |f|≤r/2；再检查可微定义要求 Δf 是否为 o(r)。</p>", steps:"<p>连续由 |f|≤r/2 得到；沿 y=x 时 Δf=r/2，因此误差与 r 同阶，不是 o(r)。</p>", solution:"<p>令 r=√(x²+y²)。<code>|f|≤r/2</code>，故 f→0=f(0,0)，连续。两个偏导在原点都为0。</p><p>若可微，则需要 <code>f(x,y)=o(r)</code>。但沿 y=x 有 <code>x y/r²=1/2</code>，所以 <code>f/r</code> 不趋于0。因此 f 在原点不可微。这同时说明连续和偏导存在不能保证可微。</p>" },
    { id:"Q13-05", order:5, chapter:"13", type:"计算题", level:"标准", section:"13.3", topic:"混合偏导", promptText:"f=x³y²−2xy⁴，求 f_xy、f_yx。", prompt:"<p>求 <code>f(x,y)=x³y²−2xy⁴</code> 的混合偏导 <code>f_xy</code> 与 <code>f_yx</code>。</p>", hint:"<p>先对 x 再对 y，或先对 y 再对 x；多项式满足混合偏导连续。</p>", steps:"<p>f_x=3x²y²−2y⁴；再对 y 得6x²y−8y³。</p>", solution:"<p><code>f_x=3x²y²−2y⁴</code>，所以 <code>f_xy=6x²y−8y³</code>。</p><p><code>f_y=2x³y−8xy³</code>，所以 <code>f_yx=6x²y−8y³</code>。二者相等。</p>" },
    { id:"Q13-06", order:6, chapter:"13", type:"计算题", level:"标准", section:"13.4", topic:"链式法则", promptText:"w=xy+x，x=t²,y=e^t，求 t=0 时 dw/dt。", prompt:"<p>设 <code>w=xy+x</code>，<code>x=t²</code>，<code>y=e^t</code>。求 t=0 时 <code>dw/dt</code>。</p>", hint:"<p>使用 dw/dt=w_x x′+w_y y′。</p>", steps:"<p>w_x=y+1,w_y=x,x′=2t,y′=e^t。</p>", solution:"<p><code>dw/dt=(y+1)(2t)+x e^t</code>。t=0 时 x=0、y=1，故 <code>dw/dt=0</code>。</p>" },
    { id:"Q13-07", order:7, chapter:"13", type:"计算题", level:"标准", section:"13.4", topic:"隐函数偏导", promptText:"x²+y²+z²=1，z>0，求 z_x、z_y。", prompt:"<p>方程 <code>x²+y²+z²=1</code> 定义 z>0 的函数 <code>z=z(x,y)</code>，求 z_x、z_y。</p>", hint:"<p>令 F=x²+y²+z²−1，或用隐函数公式。</p>", steps:"<p>F_x=2x,F_y=2y,F_z=2z。</p>", solution:"<p><code>z_x=−F_x/F_z=−x/z</code>，<code>z_y=−y/z</code>，其中 z>0。</p>" },
    { id:"Q13-08", order:8, chapter:"13", type:"应用题", level:"标准", section:"13.5", topic:"方向导数与梯度", promptText:"f=x²y+y³ 在(1,2)沿(3,4)的方向导数。", prompt:"<p>求 <code>f(x,y)=x²y+y³</code> 在 (1,2) 沿向量 <code>v=⟨3,4⟩</code> 的方向导数，并指出最速上升方向。</p>", hint:"<p>先将 v 单位化，再计算梯度点积。</p>", steps:"<p>∇f(1,2)=⟨4,13⟩，单位方向 ⟨3/5,4/5⟩。</p>", solution:"<p><code>f_x=2xy，f_y=x²+3y²</code>，故 ∇f(1,2)=⟨4,13⟩。方向 <code>u=⟨3/5,4/5⟩</code>。<code>D_uf=4(3/5)+13(4/5)=64/5</code>。最速上升方向是 ∇f/|∇f|=⟨4,13⟩/√185。</p>" },
    { id:"Q13-09", order:9, chapter:"13", type:"计算题", level:"标准", section:"13.6", topic:"切平面", promptText:"z=x²+2y² 在(1,1,3)的切平面。", prompt:"<p>求曲面 <code>z=x²+2y²</code> 在点 (1,1,3) 的切平面。</p>", hint:"<p>f_x=2x，f_y=4y。</p>", steps:"<p>f_x(1,1)=2，f_y(1,1)=4。</p>", solution:"<p><code>z=3+2(x−1)+4(y−1)=2x+4y−3</code>。</p>" },
    { id:"Q13-10", order:10, chapter:"13", type:"应用题", level:"标准", section:"13.6", topic:"线性化与全微分", promptText:"√(x²+y²) 在(3,4)，估计(3.1,3.9)。", prompt:"<p>求 <code>f(x,y)=√(x²+y²)</code> 在 (3,4) 的线性化，并用它估计 f(3.1,3.9)。</p>", hint:"<p>f(3,4)=5，梯度为 (x,y)/r。</p>", steps:"<p>∇f(3,4)=⟨3/5,4/5⟩。</p>", solution:"<p><code>L=5+(3/5)(x−3)+(4/5)(y−4)</code>。代入 (3.1,3.9) 得 <code>5+0.06−0.08=4.98</code>。</p>" },
    { id:"Q13-11", order:11, chapter:"13", type:"计算题", level:"标准", section:"13.7", topic:"二阶导数判别", promptText:"分类 f=x²+y²−2x−4y 与 g=x²−y²。", prompt:"<p>求并分类 <code>f=x²+y²−2x−4y</code> 与 <code>g=x²−y²</code> 的临界点。</p>", hint:"<p>令两个一阶偏导为零；计算 Hessian。</p>", steps:"<p>f 在(1,2)，g在(0,0)。</p>", solution:"<p>f_x=2x−2,f_y=2y−4，临界点 (1,2)。f_xx=2,f_yy=2,f_xy=0，D=4>0且f_xx>0，所以局部极小。</p><p>g 在 (0,0) 为唯一临界点，g_xx=2,g_yy=−2,g_xy=0，D=−4<0，所以是鞍点。</p>" },
    { id:"Q13-12", order:12, chapter:"13", type:"综合题", level:"挑战", section:"13.7", topic:"闭区域绝对极值", promptText:"f=x²+y²−2x 在[0,2]×[0,2]的绝对极值。", prompt:"<p>求 <code>f(x,y)=x²+y²−2x</code> 在闭方形 <code>0≤x≤2,0≤y≤2</code> 上的绝对最大值和最小值。</p>", hint:"<p>检查内临界点和四条边界。</p>", steps:"<p>f=(x−1)²+y²−1；内临界点(1,0)位于边上。</p>", solution:"<p>改写 <code>f=(x−1)²+y²−1</code>。配方表明全局最小值为 −1，在 (1,0)。最大值候选在边界端点 (0,2),(2,2)，值都为4。因此最大值为4，最小值为−1。</p>" },
    { id:"Q13-13", order:13, chapter:"13", type:"应用题", level:"标准", section:"13.8", topic:"Lagrange 乘数", promptText:"min x²+y²，约束x+y=4。", prompt:"<p>用 Lagrange 乘数法最小化 <code>x²+y²</code>，约束为 <code>x+y=4</code>。</p>", hint:"<p>∇f=λ∇g：2x=λ，2y=λ。</p>", steps:"<p>x=y；约束给出 x=y=2。</p>", solution:"<p>g=x+y−4。方程组为 <code>2x=λ, 2y=λ, x+y=4</code>，故 x=y=2，最小值为8。</p>" },
    { id:"Q13-14", order:14, chapter:"13", type:"计算题", level:"标准", section:"13.9", topic:"二元二次近似", promptText:"e^x cos y 在原点的二次近似。", prompt:"<p>求 <code>f(x,y)=e^x\cos y</code> 在原点的二次 Taylor 近似。</p>", hint:"<p>计算 f,fx,fy,fxx,fxy,fyy 在原点。</p>", steps:"<p>1,1,0,1,0,−1。</p>", solution:"<p><code>f(0,0)=1，f_x=1，f_y=0，f_xx=1，f_xy=0，f_yy=−1</code>。因此二次近似 <code>Q=1+x+½x²−½y²</code>。</p>" },
    { id:"Q13-15", order:15, chapter:"13", type:"综合题", level:"挑战", section:"13.10", topic:"约束变量与偏导", promptText:"w=x²+y²+z²,z=xy，求(1,2)处两种约束偏导。", prompt:"<p>设 <code>w=x²+y²+z²</code>，约束 <code>z=xy</code>。在 (x,y,z)=(1,2,2) 处，分别求 <code>(∂w/∂x)_y</code> 与 <code>(∂w/∂x)_z</code>。</p>", hint:"<p>前一种 z 依赖 x,y；后一种 z 独立，必须把 y=z/x 代入。</p>", steps:"<p>第一种 w=x²+y²+x²y²；第二种 w=x²+z²/x²+z²。</p>", solution:"<p>当 x,y 独立时，<code>w=x²+y²+x²y²</code>，<code>(∂w/∂x)_y=2x+2xy²</code>，在 (1,2) 为10。</p><p>当 x,z 独立时，由 z=xy 得 y=z/x，<code>w=x²+z²/x²+z²</code>，<code>(∂w/∂x)_z=2x−2z²/x³</code>，在 (1,2) 为 <code>2−8=−6</code>。两者不同，说明约束变量选择必须明确。</p>" },

    { id:"Q14-01", order:1, chapter:"14", type:"计算题", level:"基础", section:"14.1", topic:"矩形二重积分", promptText:"∫₀¹∫₀²(x+2y)dy dx。", prompt:"<p>计算 <code>∫₀¹∫₀²(x+2y)dy dx</code>。</p>", hint:"<p>内层先对 y 积分。</p>", steps:"<p>内层为2x+4；再对x积分。</p>", solution:"<p><code>∫₀²(x+2y)dy=2x+4</code>，故积分 <code>∫₀¹(2x+4)dx=1+4=5</code>。</p>" },
    { id:"Q14-02", order:2, chapter:"14", type:"计算题", level:"标准", section:"14.2", topic:"一般区域上积分", promptText:"∫₀¹∫₀ˣ xy dy dx。", prompt:"<p>计算 <code>∫₀¹∫₀^x xy\,dy\,dx</code>。</p>", hint:"<p>内层 y 从0到x。</p>", steps:"<p>内层 x·x²/2=x³/2。</p>", solution:"<p><code>∫₀^x xy\,dy=x³/2</code>，再积分 <code>∫₀¹x³/2 dx=1/8</code>。</p>" },
    { id:"Q14-03", order:3, chapter:"14", type:"证明/说明", level:"挑战", section:"14.2", topic:"交换积分次序", promptText:"计算∫₀¹∫ₓ¹ e^{y²}dy dx。", prompt:"<p>计算 <code>∫₀¹∫_x^1 e^{y²}dy dx</code>，并说明交换次序。</p>", hint:"<p>区域是 0≤x≤y≤1。</p>", steps:"<p>换成 ∫₀¹∫₀^y e^{y²}dx dy。</p>", solution:"<p>原区域由 <code>0≤x≤1, x≤y≤1</code> 描述，也可写成 <code>0≤y≤1,0≤x≤y</code>。因此积分 <code>∫₀¹∫₀^y e^{y²}dx dy=∫₀¹y e^{y²}dy=(e−1)/2</code>。</p>" },
    { id:"Q14-04", order:4, chapter:"14", type:"计算题", level:"标准", section:"14.3", topic:"区域面积", promptText:"求y=x²与y=2−x²围成面积。", prompt:"<p>求 <code>y=x²</code> 与 <code>y=2−x²</code> 所围区域的面积。</p>", hint:"<p>交点 x=±1；上曲线减下曲线。</p>", steps:"<p>A=∫₋₁¹(2−2x²)dx。</p>", solution:"<p>交点满足 x²=2−x²，得 x=±1。区间内上曲线为 2−x²，所以 <code>A=∫₋₁¹[(2−x²)−x²]dx=8/3</code>。</p>" },
    { id:"Q14-05", order:5, chapter:"14", type:"概念辨析", level:"基础", section:"14.3", topic:"区域平均值", promptText:"f=x+y 在单位正方形上的平均值。", prompt:"<p>求 <code>f(x,y)=x+y</code> 在单位正方形 [0,1]×[0,1] 上的平均值，并解释计算。</p>", hint:"<p>平均值=积分/面积；面积1。</p>", steps:"<p>∫₀¹∫₀¹(x+y)dA=1。</p>", solution:"<p>积分为 <code>1/2+1/2=1</code>，面积1，所以平均值1。它也等于行、列对称中心处函数值 <code>f(1/2,1/2)</code>，但一般函数并不会有这个性质。</p>" },
    { id:"Q14-06", order:6, chapter:"14", type:"计算题", level:"标准", section:"14.4", topic:"极坐标二重积分", promptText:"求单位四分之一圆盘上 xy dA。", prompt:"<p>求 <code>∬_R xy dA</code>，R 为第一象限单位圆盘。</p>", hint:"<p>x y=r²cosθsinθ，dA=r dr dθ。</p>", steps:"<p>∫₀^{π/2}sinθcosθ dθ·∫₀¹r³dr。</p>", solution:"<p><code>xy=(r cosθ)(r sinθ)</code>，所以积分 <code>∫₀^{π/2}∫₀¹r³cosθsinθ dr dθ=(1/2)(1/4)=1/8</code>。</p>" },
    { id:"Q14-07", order:7, chapter:"14", type:"计算题", level:"标准", section:"14.5", topic:"三重累次积分", promptText:"∫₀¹∫₀²∫₀³(x+y+z)dz dy dx。", prompt:"<p>计算 <code>∫₀¹∫₀²∫₀³(x+y+z)dz dy dx</code>。</p>", hint:"<p>逐层积分。</p>", steps:"<p>内层 3(x+y)+9/2。</p>", solution:"<p><code>∫₀³(x+y+z)dz=3x+3y+9/2</code>。再对y积分得 <code>6x+15</code>，对x得18。</p>" },
    { id:"Q14-08", order:8, chapter:"14", type:"计算题", level:"标准", section:"14.5", topic:"四面体体积", promptText:"x,y,z≥0,x+y+z≤1的体积。", prompt:"<p>求第一卦限中平面 <code>x+y+z=1</code> 与坐标平面围成四面体的体积。</p>", hint:"<p>先对z从0到1−x−y，再对y从0到1−x，x从0到1。</p>", steps:"<p>内层高为1−x−y。</p>", solution:"<p><code>V=∫₀¹∫₀^{1−x}∫₀^{1−x−y}dz dy dx=1/6</code>。</p>" },
    { id:"Q14-09", order:9, chapter:"14", type:"应用题", level:"标准", section:"14.6", topic:"质量与质心", promptText:"单位正方形密度x+y的质心。", prompt:"<p>单位正方形薄板密度 <code>δ(x,y)=x+y</code>。求质量与质心。</p>", hint:"<p>M=∫∫δ；M_y=∫∫xδ。</p>", steps:"<p>M=1；M_y=7/12；对称性给出 ȳ同样。</p>", solution:"<p><code>M=∫₀¹∫₀¹(x+y)dA=1</code>。<code>M_y=∫∫x(x+y)=1/3+1/4=7/12</code>。对称性使 M_x=7/12，所以质心为 <code>(7/12,7/12)</code>。</p>" },
    { id:"Q14-10", order:10, chapter:"14", type:"计算题", level:"标准", section:"14.6", topic:"转动惯量", promptText:"单位正方形绕原点极惯量。", prompt:"<p>单位正方形薄板密度1，求关于原点的转动惯量 <code>I_0</code>。</p>", hint:"<p>I_0=∫∫(x²+y²)dA。</p>", steps:"<p>∫x²=1/3，∫y²=1/3。</p>", solution:"<p><code>I_0=∫₀¹∫₀¹(x²+y²)dA=1/3+1/3=2/3</code>。</p>" },
    { id:"Q14-11", order:11, chapter:"14", type:"应用题", level:"标准", section:"14.6", topic:"联合概率与期望", promptText:"f=e^{−x−y},x,y≥0，求E(X)、E(Y)。", prompt:"<p>联合密度为 <code>f(x,y)=e^{-x-y}</code>，x,y≥0。求 E(X)、E(Y)。</p>", hint:"<p>边缘因子分离；验证密度总积分为1。</p>", steps:"<p>E(X)=∫₀∞x e−x dx。</p>", solution:"<p>密度总积分 <code>(∫₀∞e^{-x}dx)^2=1</code>。边缘密度均为 e^{-x}，其期望为1，所以 E(X)=E(Y)=1。</p>" },
    { id:"Q14-12", order:12, chapter:"14", type:"计算题", level:"标准", section:"14.7", topic:"柱坐标体积", promptText:"z=r²与z=4、r≤2围成体积。", prompt:"<p>求由 <code>z=r²</code>、<code>z=4</code> 和 <code>r≤2</code> 围成区域的体积。</p>", hint:"<p>V=∫θ∫r∫z dz r dr dθ。</p>", steps:"<p>z从r²到4；θ一圈。</p>", solution:"<p><code>V=∫₀^{2π}∫₀²∫_{r²}^4 r dz dr dθ=2π∫₀²r(4−r²)dr=8π</code>。</p>" },
    { id:"Q14-13", order:13, chapter:"14", type:"计算题", level:"标准", section:"14.7", topic:"球坐标体积", promptText:"半径2球的体积。", prompt:"<p>用球坐标计算半径2球的体积。</p>", hint:"<p>0≤ρ≤2，0≤φ≤π，0≤θ≤2π。</p>", steps:"<p>dV=ρ²sinφ dρdφdθ。</p>", solution:"<p><code>V=∫₀^{2π}∫₀^π∫₀²ρ²sinφ dρ dφ dθ=32π/3</code>。</p>" },
    { id:"Q14-14", order:14, chapter:"14", type:"概念辨析", level:"标准", section:"14.8", topic:"Jacobian 与面积缩放", promptText:"x=u+v,y=u−v，求Jacobian和面积变化。", prompt:"<p>变换 <code>x=u+v</code>，<code>y=u−v</code>，求 Jacobian，并说明面积如何缩放。</p>", hint:"<p>按 x_u,x_v;y_u,y_v 构造行列式。</p>", steps:"<p>J=[[1,1],[1,−1]]，det=−2。</p>", solution:"<p><code>J=∂(x,y)/∂(u,v)=</code>行列式 <code>(1)(−1)−(1)(1)=−2</code>。积分面积元按 <code>|J|=2</code> 缩放，即 <code>dx dy=2 du dv</code>。</p>" },
    { id:"Q14-15", order:15, chapter:"14", type:"综合题", level:"挑战", section:"14.4,14.7,14.8", topic:"坐标选择综合", promptText:"计算单位圆盘上e^{x²+y²}并比较坐标。", prompt:"<p>计算 <code>∬_D e^{x²+y²}dA</code>，D 为单位圆盘，并说明为什么极坐标适合。</p>", hint:"<p>x²+y²=r²，dA=r dr dθ。</p>", steps:"<p>∫θ0..2π∫r0..1e^{r²}r dr dθ。</p>", solution:"<p>极坐标下 <code>∫₀^{2π}∫₀¹e^{r²}r dr dθ=2π·(e−1)/2=π(e−1)</code>。圆形区域和径向被积函数使极坐标把积分分离；直角坐标没有简单初等原函数。</p>" },
  ],
};
