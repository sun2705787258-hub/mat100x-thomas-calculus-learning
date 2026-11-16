window.STUDY_CONTENT = {
  terms: [
    {
      en: "absolute (global) maximum",
      zh: "绝对（全局）最大值",
      definition: "若对定义域 D 中所有 x 都有 f(x) ≤ f(c)，则 f(c) 是绝对最大值。",
      section: "4.1",
      note: { tex: "f(x)\\le f(c)\\quad\\forall x\\in D", display: "f(x) ≤ f(c), x ∈ D" },
    },
    {
      en: "absolute (global) minimum",
      zh: "绝对（全局）最小值",
      definition: "若对定义域 D 中所有 x 都有 f(x) ≥ f(c)，则 f(c) 是绝对最小值。",
      section: "4.1",
      note: { tex: "f(x)\\ge f(c)\\quad\\forall x\\in D", display: "f(x) ≥ f(c), x ∈ D" },
    },
    {
      en: "extreme value",
      zh: "极值（最大值或最小值）",
      definition: "最大值与最小值的统称；需同时说明是绝对还是局部。",
      section: "4.1",
      note: "absolute / local",
    },
    {
      en: "local maximum",
      zh: "局部最大值",
      definition: "存在包含内点 c 的开区间，使区间内所有 x 满足 f(x) ≤ f(c)。端点局部极值按单侧区间定义。",
      section: "4.1",
      note: "nearby points only",
    },
    {
      en: "local minimum",
      zh: "局部最小值",
      definition: "存在包含内点 c 的开区间，使区间内所有 x 满足 f(x) ≥ f(c)。",
      section: "4.1",
      note: "nearby points only",
    },
    {
      en: "relative extremum",
      zh: "相对极值",
      definition: "local extremum 的同义表达，即局部最大值或局部最小值。",
      section: "4.1",
      note: "synonym of local extremum",
    },
    {
      en: "closed interval",
      zh: "闭区间",
      definition: "形如 [a, b] 且包含两个端点的区间；是 Extreme Value Theorem 的重要条件。",
      section: "4.1",
      note: "[a, b]",
    },
    {
      en: "interior point",
      zh: "内点",
      definition: "相对于区间而言，不从端点一侧进入的点；开区间内每一点都是内点。",
      section: "4.1",
      note: "(a, b)",
    },
    {
      en: "critical point",
      zh: "临界点",
      definition: "函数定义域的内点，且 f′(c)=0 或 f′(c) 不存在。本教材把这两种情况都称为 critical point。",
      section: "4.1",
      note: { tex: "f'(c)=0\\ \\text{or }f'(c)\\ \\text{undefined}", display: "f′(c)=0 或 f′(c) 不存在" },
    },
    {
      en: "Extreme Value Theorem",
      zh: "极值定理",
      definition: "闭区间上的连续函数必取得绝对最大值和绝对最小值。",
      section: "4.1",
      note: "continuous on a closed finite interval",
    },
    {
      en: "Rolle’s Theorem",
      zh: "罗尔定理",
      definition: "若 f 在 [a,b] 连续、在 (a,b) 可导且 f(a)=f(b)，则存在内点 c 使 f′(c)=0。",
      section: "4.2",
      note: { tex: "f(a)=f(b)\\Rightarrow\\exists c\\in(a,b),\\ f'(c)=0", display: "f(a)=f(b) ⇒ ∃c，f′(c)=0" },
    },
    {
      en: "Mean Value Theorem",
      zh: "中值定理（拉格朗日中值定理）",
      definition: "连续于 [a,b]、内点可导时，至少存在一个 c，使某点瞬时变化率等于整个区间的平均变化率。",
      section: "4.2",
      note: {
        tex: "\\frac{f(b)-f(a)}{b-a}=f'(c),\quad c\\in(a,b)",
        display: "[f(b)−f(a)]/(b−a)=f′(c)",
      },
    },
    {
      en: "average change",
      zh: "平均变化",
      definition: "区间端点函数值之差除以区间长度，即 [f(b)−f(a)]/(b−a)。",
      section: "4.2",
      note: "secant slope",
    },
    {
      en: "instantaneous change",
      zh: "瞬时变化",
      definition: "某一点的导数 f′(c)；中值定理把瞬时变化与区间平均变化联系起来。",
      section: "4.2",
      note: "tangent slope",
    },
    {
      en: "increasing function",
      zh: "增函数",
      definition: "在区间上随自变量增大而函数值增大；教材常用 Corollary 3 通过导数符号判断。",
      section: "4.3",
      note: "f′>0 on an interval",
    },
    {
      en: "decreasing function",
      zh: "减函数",
      definition: "在区间上随自变量增大而函数值减小；不能只看某个单点的导数值。",
      section: "4.3",
      note: "f′<0 on an interval",
    },
    {
      en: "monotonic function",
      zh: "单调函数",
      definition: "在区间上始终递增或始终递减的函数。",
      section: "4.3",
      note: "increasing or decreasing on an interval",
    },
    {
      en: "First Derivative Test",
      zh: "一阶导数判别法",
      definition: "在临界点两侧观察 f′ 的符号变化：负到正为局部最小，正到负为局部最大，不变号则无极值。",
      section: "4.3",
      note: "− → + : local min; + → − : local max",
    },
    {
      en: "concavity",
      zh: "凹凸性",
      definition: "描述导函数是在增加还是减少，从而描述曲线弯曲方向。",
      section: "4.4",
      note: "f′ increasing or decreasing",
    },
    {
      en: "concave up / convex",
      zh: "凹向上 / 凸",
      definition: "在区间上 f′ 递增，通常由 f″>0 判定；曲线位于其切线之上。",
      section: "4.4",
      note: { tex: "f''(x)>0\\Rightarrow\\text{concave up}", display: "f″>0 ⇒ concave up" },
    },
    {
      en: "concave down",
      zh: "凹向下",
      definition: "在区间上 f′ 递减，通常由 f″<0 判定；曲线位于其切线之下。",
      section: "4.4",
      note: { tex: "f''(x)<0\\Rightarrow\\text{concave down}", display: "f″<0 ⇒ concave down" },
    },
    {
      en: "point of inflection",
      zh: "拐点",
      definition: "曲线有切线且凹凸性发生改变的点。仅凭 f″(c)=0 不能断言是拐点。",
      section: "4.4",
      note: "tangent exists + concavity changes",
    },
    {
      en: "Second Derivative Test",
      zh: "二阶导数判别法",
      definition: "在 f′(c)=0 且 f″ 连续的条件下，f″(c)<0 为局部最大，f″(c)>0 为局部最小；f″(c)=0 失效。",
      section: "4.4",
      note: "test fails when f″(c)=0",
    },
    {
      en: "curve sketching",
      zh: "曲线作图",
      definition: "综合定义域、对称性、增减性、凹凸性、极值、拐点和渐近线描绘函数图形。",
      section: "4.4",
      note: "f′ locates change; f″ locates bending",
    },
    {
      en: "asymptote",
      zh: "渐近线",
      definition: "曲线在远处或某点附近无限接近的直线，包括水平、垂直和斜渐近线。",
      section: "4.4",
      note: "horizontal / vertical / oblique",
    },
    {
      en: "applied optimization",
      zh: "应用最优化",
      definition: "用导数寻找实际模型中的最大或最小量；必须同时检查临界点和可行域端点。",
      section: "4.5",
      note: "model → one variable → global check",
    },
    {
      en: "constraint",
      zh: "约束条件",
      definition: "限制变量可行取值的等式、不等式或物理条件；常见作用是消去一个变量。",
      section: "4.5",
      note: "e.g. πr²h=1000",
    },
    {
      en: "marginal cost",
      zh: "边际成本",
      definition: "成本函数 c(x) 的导数 c′(x)，表示多生产一个单位时成本的近似变化。",
      section: "4.5",
      note: { tex: "c'(x)", display: "c′(x)" },
    },
    {
      en: "marginal revenue",
      zh: "边际收益",
      definition: "收益函数 r(x) 的导数 r′(x)。",
      section: "4.5",
      note: { tex: "r'(x)", display: "r′(x)" },
    },
    {
      en: "marginal profit",
      zh: "边际利润",
      definition: "利润函数 p(x)=r(x)−c(x) 的导数 p′(x)=r′(x)−c′(x)。",
      section: "4.5",
      note: "maximum profit can occur when r′=c′",
    },
    {
      en: "Newton’s method / Newton–Raphson method",
      zh: "牛顿法 / 牛顿–拉夫森法",
      definition: "用当前点处的切线零点迭代逼近方程 f(x)=0 的根。",
      section: "4.6",
      note: {
        tex: "x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}",
        display: "xₙ₊₁=xₙ−f(xₙ)/f′(xₙ)",
      },
    },
    {
      en: "root / zero",
      zh: "根 / 零点",
      definition: "满足 f(r)=0 的数 r，也就是方程 f(x)=0 的解和图像与 x 轴交点的横坐标。",
      section: "4.6",
      note: { tex: "f(r)=0", display: "f(r)=0" },
    },
    {
      en: "initial guess",
      zh: "初始猜测值",
      definition: "牛顿法中的 x₀。选值不当可能导致振荡、落到其他根或不收敛。",
      section: "4.6",
      note: "x₀",
    },
    {
      en: "convergence",
      zh: "收敛",
      definition: "迭代数列越来越接近目标值；教材强调牛顿法通常很快，但不保证收敛。",
      section: "4.6",
      note: "check |f(xₙ)| and |xₙ₊₁−xₙ|",
    },
    {
      en: "antiderivative",
      zh: "原函数",
      definition: "在区间 I 上若 F′(x)=f(x) 对所有 x 成立，则 F 是 f 的一个原函数。",
      section: "4.7",
      note: { tex: "F'(x)=f(x)", display: "F′(x)=f(x)" },
    },
    {
      en: "indefinite integral",
      zh: "不定积分",
      definition: "函数 f 的全部原函数集合，记作 ∫f(x)dx=F(x)+C。",
      section: "4.7",
      note: { tex: "\\int f(x)\\,dx=F(x)+C", display: "∫f(x)dx=F(x)+C" },
    },
    {
      en: "differential equation",
      zh: "微分方程",
      definition: "含未知函数及其导数的方程；本章重点是可直接积分的一阶形式。",
      section: "4.7",
      note: { tex: "dy/dx=f(x)", display: "dy/dx=f(x)" },
    },
    {
      en: "initial condition",
      zh: "初始条件",
      definition: "给定未知函数在某一点的值，用于从含常数 C 的通解中选出特解。",
      section: "4.7",
      note: { tex: "y(x_0)=y_0", display: "y(x₀)=y₀" },
    },
    {
      en: "initial value problem",
      zh: "初值问题",
      definition: "微分方程与初始条件组成的整体。",
      section: "4.7",
      note: "ODE + initial condition",
    },
    {
      en: "general solution / particular solution",
      zh: "通解 / 特解",
      definition: "通解包含任意常数 C；特解由初始条件确定常数。",
      section: "4.7",
      note: "F(x)+C → one value of C",
    },
    {
      en: "Constant Multiple Rule / Sum or Difference Rule",
      zh: "常数倍法则 / 和差法则",
      definition: "原函数运算与导数线性法则平行：常数可提出，和差可逐项积分。",
      section: "4.7",
      note: "∫[kf±g]dx=k∫f dx±∫g dx",
    },
    {
      en: "finite sum",
      zh: "有限和",
      definition: "把有限多个乘积相加；在本章中常用于矩形面积、位移与平均值估计。",
      section: "5.1",
      note: "sample × width",
    },
    {
      en: "upper sum",
      zh: "上和",
      definition: "每个子区间用函数最大值为矩形高度形成的估计；连续非负函数中通常高于真实面积。",
      section: "5.1",
      note: "max height on each subinterval",
    },
    {
      en: "lower sum",
      zh: "下和",
      definition: "每个子区间用函数最小值为矩形高度形成的估计；连续非负函数中通常低于真实面积。",
      section: "5.1",
      note: "min height on each subinterval",
    },
    {
      en: "midpoint rule",
      zh: "中点法则",
      definition: "用各子区间中点的函数值作为矩形高度。",
      section: "5.1",
      note: { tex: "c_k=(x_{k-1}+x_k)/2", display: "cₖ=(xₖ₋₁+xₖ)/2" },
    },
    {
      en: "displacement",
      zh: "位移",
      definition: "末位置减初位置，是带符号的位置净变化；可由 ∫v(t)dt 得到。",
      section: "5.1",
      note: "can cancel",
    },
    {
      en: "distance traveled",
      zh: "总路程",
      definition: "实际经过的路径长度；经过转向点时要把各段路程相加。",
      section: "5.1",
      note: "∫|v(t)|dt",
    },
    {
      en: "speed",
      zh: "速率",
      definition: "速度的绝对值 |v(t)|，非负；它区分总路程与位移。",
      section: "5.1",
      note: { tex: "|v(t)|", display: "|v(t)|" },
    },
    {
      en: "average value / mean",
      zh: "平均值 / 均值",
      definition: "可积函数在 [a,b] 上的平均值等于积分除以区间长度。",
      section: "5.1 & 5.3",
      note: {
        tex: "\\operatorname{av}(f)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx",
        display: "av(f)=[1/(b−a)]∫ₐᵇf(x)dx",
      },
    },
    {
      en: "sigma notation",
      zh: "求和符号（西格玛记号）",
      definition: "用 Σ 紧凑表示有限和，下标给出起始项，上标给出终止项。",
      section: "5.2",
      note: { tex: "\\sum_{k=1}^n a_k", display: "Σₖ₌₁ⁿaₖ" },
    },
    {
      en: "index of summation",
      zh: "求和指标",
      definition: "在 Σ 记号中逐项变化的字母，如 k、i、j；字母本身不改变和。",
      section: "5.2",
      note: "dummy index",
    },
    {
      en: "algebra rules for finite sums",
      zh: "有限和的代数法则",
      definition: "有限和可逐项相加、相减，常数因子可提出，常数的 n 项和为 nc。",
      section: "5.2",
      note: "sum / difference / constant rules",
    },
    {
      en: "sum of the first n squares",
      zh: "前 n 个平方数之和",
      definition: "把平方和从展开形式压缩为一个只依赖 n 的公式，常用于 Riemann 和极限。",
      section: "5.2",
      note: {
        tex: "\\sum_{k=1}^n k^2=\\frac{n(n+1)(2n+1)}{6}",
        display: "Σk²=n(n+1)(2n+1)/6",
      },
    },
    {
      en: "partition",
      zh: "分割",
      definition: "把闭区间 [a,b] 分成若干首尾相接子区间的有序分点集合。",
      section: "5.2",
      note: { tex: "P=\\{x_0,x_1,\\ldots,x_n\\}", display: "P={x₀,x₁,…,xₙ}" },
    },
    {
      en: "norm of a partition",
      zh: "分割的范数",
      definition: "所有子区间宽度中的最大值，记作 ||P||；它控制整个分割是否足够细。",
      section: "5.2",
      note: { tex: "\\|P\\|=\\max_k\\Delta x_k", display: "||P||=maxₖ Δxₖ" },
    },
    {
      en: "Riemann sum",
      zh: "黎曼和",
      definition: "在每个子区间选采样点 cₖ，把 f(cₖ)Δxₖ 相加形成的近似和。",
      section: "5.2",
      note: {
        tex: "S_P=\\sum_{k=1}^n f(c_k)\\Delta x_k",
        display: "Sₚ=Σₖ₌₁ⁿf(cₖ)Δxₖ",
      },
    },
    {
      en: "left-endpoint / right-endpoint sum",
      zh: "左端点 / 右端点和",
      definition: "采样点 cₖ 分别取子区间左端点或右端点；单调函数可据此快速判断上、下和。",
      section: "5.2",
      note: "same width, different cₖ",
    },
    {
      en: "definite integral",
      zh: "定积分",
      definition: "所有分割范数趋于 0 时黎曼和的统一极限，记作 ∫ₐᵇf(x)dx。",
      section: "5.3",
      note: "a number, not a family",
    },
    {
      en: "integrand",
      zh: "被积函数",
      definition: "积分号后被积分的函数 f(x)。",
      section: "5.3",
      note: "the function being integrated",
    },
    {
      en: "limits of integration",
      zh: "积分上下限",
      definition: "定积分号上下方的 a 与 b，确定积分区间。",
      section: "5.3",
      note: "a and b",
    },
    {
      en: "dummy variable",
      zh: "哑变量",
      definition: "定积分内部的积分变量；换成其他字母不改变积分值。",
      section: "5.3",
      note: { tex: "\\int_a^b f(x)\\,dx=\\int_a^b f(t)\\,dt", display: "∫ₐᵇf(x)dx=∫ₐᵇf(t)dt" },
    },
    {
      en: "integrable",
      zh: "可积",
      definition: "当分割范数趋于 0 时，任意合法黎曼和都收敛到同一个极限。",
      section: "5.3",
      note: "same limit regardless of choices",
    },
    {
      en: "jump discontinuity",
      zh: "跳跃间断点",
      definition: "左右单侧极限都存在但不相等；有限个跳跃间断的函数仍可积。",
      section: "5.3",
      note: "finite jumps are allowed",
    },
    {
      en: "piecewise-continuous function",
      zh: "分段连续函数",
      definition: "闭区间中至多有有限个跳跃间断点的函数。",
      section: "5.3",
      note: "finite number of jumps",
    },
    {
      en: "Max-Min Inequality",
      zh: "最大–最小不等式",
      definition: "定积分位于“最小值 × 区间长度”和“最大值 × 区间长度”之间。",
      section: "5.3",
      note: "(min f)(b−a) ≤ ∫ₐᵇf ≤ (max f)(b−a)",
    },
    {
      en: "domination rule",
      zh: "比较（支配）法则",
      definition: "若在区间上 f(x)≥g(x)，则同区间上的 f 积分不小于 g 积分。",
      section: "5.3",
      note: "f≥g ⇒ ∫f≥∫g",
    },
    {
      en: "additivity of definite integrals",
      zh: "定积分区间可加性",
      definition: "在相邻子区间上的积分相加等于整个区间上的积分。",
      section: "5.3",
      note: { tex: "\\int_a^c f+\\int_c^b f=\\int_a^b f", display: "∫ₐᶜf+∫ᶜᵇf=∫ₐᵇf" },
    },
    {
      en: "signed area",
      zh: "带符号面积",
      definition: "x 轴上方贡献正量、下方贡献负量；定积分可能表示带符号面积。",
      section: "5.3",
      note: "area can cancel",
    },
    {
      en: "area under a curve",
      zh: "曲线下方面积",
      definition: "对非负可积函数，曲线与 x 轴之间的几何面积就是定积分。",
      section: "5.3",
      note: "requires f≥0",
    },
    {
      en: "Mean Value Theorem for Definite Integrals",
      zh: "定积分中值定理",
      definition: "闭区间连续函数的某个函数值等于该区间上的平均值。",
      section: "5.4",
      note: { tex: "f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx", display: "f(c)=[1/(b−a)]∫ₐᵇf(x)dx" },
    },
    {
      en: "accumulation function",
      zh: "累积函数",
      definition: "把上限作为变量得到的函数 F(x)=∫ₐˣ f(t)dt；它累计从 a 到 x 的积分。",
      section: "5.4",
      note: { tex: "F(x)=\\int_a^x f(t)\\,dt", display: "F(x)=∫ₐˣf(t)dt" },
    },
    {
      en: "Fundamental Theorem of Calculus, Part 1",
      zh: "微积分基本定理第一部分",
      definition: "连续函数 f 的累积函数 F 可导，且 F′(x)=f(x)。",
      section: "5.4",
      note: { tex: "\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)", display: "d/dx∫ₐˣf(t)dt=f(x)" },
    },
    {
      en: "Evaluation Theorem / FTC Part 2",
      zh: "求值定理 / 微积分基本定理第二部分",
      definition: "若 F 是连续函数 f 的任一原函数，则 ∫ₐᵇf(x)dx=F(b)−F(a)。",
      section: "5.4",
      note: "find antiderivative, evaluate endpoints",
    },
    {
      en: "Net Change Theorem",
      zh: "净变化定理",
      definition: "函数在区间上的净变化等于其变化率的积分。",
      section: "5.4",
      note: { tex: "F(b)-F(a)=\\int_a^b F'(x)\\,dx", display: "F(b)−F(a)=∫ₐᵇF′(x)dx" },
    },
    {
      en: "total area",
      zh: "总面积",
      definition: "按函数变号点分段，再把各段几何面积相加；不能直接让正负积分抵消。",
      section: "5.4",
      note: "split at zeros; add absolute values",
    },
    {
      en: "Substitution Rule",
      zh: "换元法则",
      definition: "逆向使用链式法则，把复合积分化为关于 u 的较简单积分。",
      section: "5.5",
      note: { tex: "\\int f(g(x))g'(x)\\,dx=\\int f(u)\\,du", display: "∫f(g(x))g′(x)dx=∫f(u)du" },
    },
    {
      en: "u-substitution",
      zh: "u 换元",
      definition: "选择 u=g(x)，计算 du=g′(x)dx，再完成积分；最后代回或变换积分限。",
      section: "5.5",
      note: "u = inner expression",
    },
    {
      en: "transformed limits",
      zh: "变换后的积分限",
      definition: "定积分换元时，将原 x 上下限 a、b 分别替换为 g(a)、g(b)，无需再代回 x。",
      section: "5.6",
      note: { tex: "x:a\\to b\\quad\\Rightarrow\\quad u:g(a)\\to g(b)", display: "x:a→b ⇒ u:g(a)→g(b)" },
    },
    {
      en: "symmetric interval",
      zh: "对称区间",
      definition: "形如 [−a,a] 的区间；奇偶函数在此有专门的积分简化。",
      section: "5.6",
      note: "[−a, a]",
    },
    {
      en: "even function",
      zh: "偶函数",
      definition: "满足 f(−x)=f(x)，图像关于 y 轴对称；在对称区间上的积分为 0 到 a 的两倍。",
      section: "5.6",
      note: "∫₋ₐᵃf=2∫₀ᵃf",
    },
    {
      en: "odd function",
      zh: "奇函数",
      definition: "满足 f(−x)=−f(x)，图像关于原点对称；在对称区间上的积分为 0。",
      section: "5.6",
      note: "∫₋ₐᵃf=0",
    },
    {
      en: "area between curves",
      zh: "两曲线间面积",
      definition: "若 f(x)≥g(x)，则上下曲线之间的面积是 ∫ₐᵇ[f(x)−g(x)]dx。",
      section: "5.6",
      note: "upper minus lower",
    },
    {
      en: "integration with respect to y",
      zh: "关于 y 积分",
      definition: "用水平条带表示面积，求右边界函数减左边界函数，并对 y 的区间积分。",
      section: "5.6",
      note: "right minus left",
    },
    {
      en: "right-hand / left-hand curve",
      zh: "右边界曲线 / 左边界曲线",
      definition: "在关于 y 积分时，分别给出区域内每条水平线的最大 x 与最小 x。",
      section: "5.6",
      note: "f(y)−g(y)≥0",
    },
  ],

  exercises: [
    {
      id: "Q4-01",
      order: 1,
      chapter: "4",
      type: "概念辨析",
      level: "基础",
      section: "4.1",
      topic: "局部极值与绝对极值、定义域",
      promptText: "比较 f(x)=x² 在 [-2,2] 与 (0,2] 上的最大值、最小值及其类型。",
      prompt:
        "<p>比较同一个公式 <code>f(x)=x²</code> 在 <code>[-2,2]</code> 与 <code>(0,2]</code> 上的绝对最大值、绝对最小值及其取得位置。这个例子说明定义域为什么不能省略？</p>",
      hint:
        "<p>先分别列出定义域内的候选点。开区间的端点如果不在定义域内，就不能作为最小值的取得点。</p>",
      steps:
        "<p>在 [-2,2] 上，x=0 给出最小值 0，x=±2 给出最大值 4。在 (0,2] 上，f(x)&gt;0，故 x=2 给出最大值 4，但 0 不可取，因此不存在绝对最小值。</p>",
      solution:
        "<p>在 [-2,2] 上：绝对最小值为 0，在 x=0 取得；绝对最大值为 4，在 x=±2 取得。二者也都是局部极值。</p><p>在 (0,2] 上：绝对最大值为 4，在 x=2 取得；不存在绝对最小值，因为函数值可以任意接近 0，却永远不能等于 0。结论是：同一个表达式在不同定义域上的极值存在性和位置可能不同；写极值问题时必须保留定义域。</p>",
    },
    {
      id: "Q4-02",
      order: 2,
      chapter: "4",
      type: "概念辨析",
      level: "基础",
      section: "4.1",
      topic: "临界点与局部极值",
      promptText: "说明 f(x)=x³ 在 x=0 的临界点为何不是极值。",
      prompt:
        "<p>求 <code>f(x)=x³</code> 在 x=0 的导数，并解释为什么“临界点”并不能推出“局部极值”。</p>",
      hint:
        "<p>检查 x=0 左右两侧 f′ 的符号。还要回想：一阶导数为 0 只是可能的极值点。</p>",
      steps:
        "<p>f′(x)=3x²，所以 x=0 是临界点。f′(x) 在 0 的两侧都为正。</p>",
      solution:
        "<p>f′(0)=0，因此 x=0 是临界点。但 f′(x)=3x² 在 x&lt;0 和 x&gt;0 时都为正，曲线始终递增；函数既没有局部最大，也没有局部最小。结论：临界点只是“极值可能发生的位置”，必须再用符号变化或函数值比较确认。</p>",
    },
    {
      id: "Q4-03",
      order: 3,
      chapter: "4",
      type: "计算题",
      level: "标准",
      section: "4.1",
      topic: "闭区间绝对极值",
      promptText: "求 f(x)=x³−3x 在 [-2,3] 上的绝对最大值和最小值。",
      prompt:
        "<p>求 <code>f(x)=x³−3x</code> 在闭区间 <code>[-2,3]</code> 上的绝对最大值、绝对最小值及取得位置。</p>",
      hint:
        "<p>先求 f′(x)，找出区间内的临界点，再比较临界点和两个端点的函数值。</p>",
      steps:
        "<p>f′(x)=3(x−1)(x+1)，临界点为 x=−1 和 x=1。需比较 f(−2)、f(−1)、f(1)、f(3)。</p>",
      solution:
        "<p>f′(x)=3x²−3=3(x−1)(x+1)，临界点为 x=−1、1。</p><p>f(−2)=−8+6=−2；f(−1)=−1+3=2；f(1)=1−3=−2；f(3)=27−9=18。</p><p>所以绝对最大值为 18，在 x=3 取得；绝对最小值为 −2，在 x=−2 和 x=1 两处取得。两个最小值取得点都要写出。</p>",
    },
    {
      id: "Q4-04",
      order: 4,
      chapter: "4",
      type: "证明/说明",
      level: "标准",
      section: "4.2",
      topic: "罗尔定理与中值定理",
      promptText: "对 f(x)=x³−x 在 [-1,1] 应用罗尔定理并求所有 c。",
      prompt:
        "<p>验证 <code>f(x)=x³−x</code> 在 <code>[-1,1]</code> 上满足罗尔定理的条件，并求结论中的所有 c。</p>",
      hint:
        "<p>先核对连续、可导和端点函数值是否相等，再解 f′(c)=0。</p>",
      steps:
        "<p>f 是多项式，故连续且可导；f(−1)=f(1)=0。f′(x)=3x²−1。</p>",
      solution:
        "<p>多项式 f 在闭区间上连续、在开区间内可导，并且 f(−1)=f(1)=0，所以罗尔定理适用。</p><p>由 f′(x)=3x²−1=0，得 <code>c=±1/√3</code>。两数都在 (−1,1) 内，因此结论中的两个点都应列出。罗尔定理只保证至少一个，不限制最多一个。</p>",
    },
    {
      id: "Q4-05",
      order: 5,
      chapter: "4",
      type: "证明/说明",
      level: "标准",
      section: "4.2",
      topic: "唯一零点",
      promptText: "证明 f(x)=x³+x−2 在实数中只有一个零点。",
      prompt:
        "<p>证明方程 <code>x³+x−2=0</code> 恰有一个实根。</p>",
      hint:
        "<p>先用观察或介值定理证明至少有一个根，再用导数或罗尔定理排除两个及以上的根。</p>",
      steps:
        "<p>可观察到 x=1 是根。f′(x)=3x²+1 恒大于 0，所以函数严格递增。</p>",
      solution:
        "<p>f(1)=1+1−2=0，至少有一个实根。</p><p>又有 f′(x)=3x²+1&gt;0 对所有实数成立，故 f 在整个实数轴上严格递增。严格递增函数不可能在两个不同点取同一个值，因此不可能另有零点。所以该方程恰有一个实根，即 x=1。</p>",
    },
    {
      id: "Q4-06",
      order: 6,
      chapter: "4",
      type: "计算题",
      level: "标准",
      section: "4.3",
      topic: "单调性和局部极值",
      promptText: "求 f(x)=x/(x²+1) 的增减区间和局部极值。",
      prompt:
        "<p>求 <code>f(x)=x/(x²+1)</code> 的单调区间，并判断局部最大、局部最小值。</p>",
      hint:
        "<p>使用商法则，并因分母恒正而只分析分子符号。</p>",
      steps:
        "<p>f′(x)=(1−x²)/(x²+1)²。临界点为 x=±1，分母恒正。</p>",
      solution:
        "<p>商法则给出 <code>f′(x)=(1−x²)/(x²+1)²</code>。</p><p>当 x&lt;−1 或 x&gt;1 时 f′&lt;0；当 −1&lt;x&lt;1 时 f′&gt;0。因此函数在 (−∞,−1) 和 (1,∞) 递减，在 (−1,1) 递增。</p><p>f(−1)=−1/2 是局部最小值，f(1)=1/2 是局部最大值。由单调区间还可判断它们分别是整个定义域上的绝对最小值与绝对最大值。</p>",
    },
    {
      id: "Q4-07",
      order: 7,
      chapter: "4",
      type: "计算题",
      level: "标准",
      section: "4.4",
      topic: "凹凸性、拐点与极值",
      promptText: "分析 f(x)=x³−6x²+9x 的凹凸、拐点和局部极值。",
      prompt:
        "<p>对 <code>f(x)=x³−6x²+9x</code>：求单调区间、凹凸区间、拐点和局部极值。</p>",
      hint:
        "<p>分别求 f′ 与 f″，用两者的零点建立符号表。</p>",
      steps:
        "<p>f′(x)=3(x−1)(x−3)，f″(x)=6(x−2)。</p>",
      solution:
        "<p>f′(x)=3x²−12x+9=3(x−1)(x−3)。f′ 在 (−∞,1) 为正、在 (1,3) 为负、在 (3,∞) 为正，所以函数在 (−∞,1) 和 (3,∞) 递增，在 (1,3) 递减。</p><p>于是 f(1)=4 是局部最大值，f(3)=0 是局部最小值。</p><p>f″(x)=6x−12=6(x−2)。x&lt;2 时 f″&lt;0，曲线凹向下；x&gt;2 时 f″&gt;0，曲线凹向上。凹凸性在 x=2 两侧改变，故 (2,2) 是拐点。</p>",
    },
    {
      id: "Q4-08",
      order: 8,
      chapter: "4",
      type: "证明/说明",
      level: "挑战",
      section: "4.2–4.3",
      topic: "用中值定理证明严格单调",
      promptText: "若 f 在 [a,b] 连续、在 (a,b) 可导且 f′>0，证明 f 严格递增。",
      prompt:
        "<p>设 f 在 <code>[a,b]</code> 连续、在 <code>(a,b)</code> 可导，且对所有内点都有 <code>f′(x)&gt;0</code>。证明 f 在 [a,b] 上严格递增。</p>",
      hint:
        "<p>任取 x₁&lt;x₂，对区间 [x₁,x₂] 使用中值定理。</p>",
      steps:
        "<p>中值定理给出 f(x₂)−f(x₁)=f′(c)(x₂−x₁)。两个因子都严格为正。</p>",
      solution:
        "<p>任取 a≤x₁&lt;x₂≤b。由于 f 在 [x₁,x₂] 连续、在 (x₁,x₂) 可导，中值定理保证存在 c∈(x₁,x₂)，使</p><p><code>f(x₂)−f(x₁)=f′(c)(x₂−x₁)</code>。</p><p>由条件 f′(c)&gt;0，且 x₂−x₁&gt;0，所以右边严格为正，进而 f(x₂)&gt;f(x₁)。这对任意 x₁&lt;x₂ 成立，因此 f 严格递增。</p>",
    },
    {
      id: "Q4-09",
      order: 9,
      chapter: "4",
      type: "应用题",
      level: "标准",
      section: "4.5",
      topic: "盒体最优化",
      promptText: "20 cm 正方形纸板四角剪去等边正方形，求最大盒体积。",
      prompt:
        "<p>把边长为 20 cm 的正方形纸板四角各剪去边长为 x 的正方形，再折成无盖盒。求使体积最大的 x，并求最大体积。</p>",
      hint:
        "<p>盒底边长是 20−2x，高是 x。使用 0&lt;x&lt;10，并检查临界点与端点的意义。</p>",
      steps:
        "<p>V(x)=x(20−2x)²。令 V′(x)=4(3x−10)(x−10)=0。</p>",
      solution:
        "<p>体积函数为 <code>V(x)=x(20−2x)²</code>，定义域为 0&lt;x&lt;10。</p><p>展开得 V=400x−80x²+4x³，因此 V′=400−160x+12x²=4(3x²−40x+100)=4(3x−10)(x−10)。</p><p>在开区间 (0,10) 内唯一临界点是 x=10/3。端点极限体积为 0，而 V(10/3)&gt;0，所以该点给出绝对最大值。</p><p>V(10/3)=(10/3)·(40/3)²=16000/27 cm³。因此应剪去边长约 3.33 cm 的正方形，最大体积约 592.59 cm³。</p>",
    },
    {
      id: "Q4-10",
      order: 10,
      chapter: "4",
      type: "应用题",
      level: "标准",
      section: "4.5",
      topic: "约束与建模",
      promptText: "靠河围矩形，100 m 篱笆只围三边，求最大面积。",
      prompt:
        "<p>一块矩形地一边靠直河，不需要篱笆；用 100 m 篱笆围另外三边。求最大面积及尺寸。</p>",
      hint:
        "<p>设垂直河的两边长为 x，则平行河的一边为 100−2x。写出面积并确定可行域。</p>",
      steps:
        "<p>A(x)=x(100−2x)=100x−2x²，0&lt;x&lt;50。A′(x)=100−4x。</p>",
      solution:
        "<p>设两条垂直河岸的边长均为 x，平行河岸的边长为 100−2x，则面积为</p><p><code>A(x)=x(100−2x)=100x−2x², 0&lt;x&lt;50</code>。</p><p>A′(x)=100−4x，临界点 x=25。A″(x)=−4&lt;0 或符号变化均可确认这是最大值。此时另一边长为 50 m，面积为 25×50=1250 m²。</p>",
    },
    {
      id: "Q4-11",
      order: 11,
      chapter: "4",
      type: "计算题",
      level: "标准",
      section: "4.6",
      topic: "牛顿法迭代",
      promptText: "从 x₀=2 用牛顿法近似 √3，求 x₁、x₂。",
      prompt:
        "<p>把 √3 看作方程 <code>x²−3=0</code> 的正根。取 x₀=2，用牛顿法求 x₁ 和 x₂。</p>",
      hint:
        "<p>f′(x)=2x，因此迭代公式为 xₙ₊₁=(xₙ+3/xₙ)/2。</p>",
      steps:
        "<p>x₁=1.75。将 x₁ 代入同一公式计算 x₂。</p>",
      solution:
        "<p>f(x)=x²−3，f′(x)=2x，所以</p><p><code>xₙ₊₁=xₙ−(xₙ²−3)/(2xₙ)=½(xₙ+3/xₙ)</code>。</p><p>x₀=2 时，x₁=½(2+1.5)=1.75；x₂=½(1.75+3/1.75)=1.732142857…。它已经非常接近 √3≈1.732050808。</p>",
    },
    {
      id: "Q4-12",
      order: 12,
      chapter: "4",
      type: "计算题",
      level: "标准",
      section: "4.7",
      topic: "初值问题",
      promptText: "解 f′(x)=3x²−4x+2，f(1)=0。",
      prompt:
        "<p>求满足 <code>f′(x)=3x²−4x+2</code>、<code>f(1)=0</code> 的函数 f。</p>",
      hint:
        "<p>先逐项求原函数，并把常数 C 留到最后，再代入 x=1。</p>",
      steps:
        "<p>f(x)=x³−2x²+2x+C。由 f(1)=0 求 C。</p>",
      solution:
        "<p>对 f′ 逐项积分：<code>f(x)=x³−2x²+2x+C</code>。</p><p>代入 f(1)=0，有 1−2+2+C=0，所以 C=−1。</p><p>因此 <code>f(x)=x³−2x²+2x−1</code>。求导可反查：结果为 3x²−4x+2，并且 f(1)=0。</p>",
    },
    {
      id: "Q4-13",
      order: 13,
      chapter: "4",
      type: "综合题",
      level: "挑战",
      section: "4.3–4.4",
      topic: "运动、速度、加速度",
      promptText: "分析 s(t)=t³−6t²+9t 的运动方向、位置极值和拐点。",
      prompt:
        "<p>质点的位置函数为 <code>s(t)=t³−6t²+9t</code>，t≥0。求质点向右、向左运动的区间，局部位置极值及位置图像的拐点。</p>",
      hint:
        "<p>s′ 是速度，s″ 是加速度。运动方向由速度符号决定，凹凸转折由加速度符号改变决定。</p>",
      steps:
        "<p>s′(t)=3(t−1)(t−3)，s″(t)=6(t−2)。</p>",
      solution:
        "<p>s′(t)=3t²−12t+9=3(t−1)(t−3)。</p><p>0≤t&lt;1 或 t&gt;3 时速度为正是向右运动；1&lt;t&lt;3 时速度为负是向左运动；t=1、3 时瞬时静止。</p><p>s(1)=4 是局部最大高度，s(3)=0 是局部最小高度。</p><p>s″(t)=6(t−2)。加速度在 t&lt;2 为负、t&gt;2 为正，凹凸性在 t=2 改变；s(2)=2，所以位置图像的拐点是 (2,2)。拐点表示加速度改变符号，不等同于“位置极值”。</p>",
    },
    {
      id: "Q4-14",
      order: 14,
      chapter: "4",
      type: "概念辨析",
      level: "标准",
      section: "4.4",
      topic: "二阶导数判别法失效",
      promptText: "比较在 x=0 处 f′=f″=0 的 x⁴、−x⁴、x³。",
      prompt:
        "<p>函数 <code>x⁴</code>、<code>−x⁴</code>、<code>x³</code> 在 x=0 处都有 f′(0)=f″(0)=0，分别说明它们在该点的极值情况，并解释为什么二阶导数判别法此时失效。</p>",
      hint:
        "<p>直接比较 x=0 附近的值，或看一阶导数的符号变化。</p>",
      steps:
        "<p>x⁴≥0、−x⁴≤0，而 x³ 在 0 两侧异号。二阶导数的零不能区分这些情况。</p>",
      solution:
        "<p>x⁴ 在 x=0 有局部最小，−x⁴ 有局部最大，x³ 在 x=0 没有极值。三者都满足 f′(0)=f″(0)=0，说明当 f″(c)=0 时，二阶导数判别法无法给出结论。此时应改看一阶导数是否变号，或直接比较附近函数值。</p>",
    },
    {
      id: "Q4-15",
      order: 15,
      chapter: "4",
      type: "综合题",
      level: "挑战",
      section: "4.2 & 4.7",
      topic: "导数信息与原函数",
      promptText: "已知 f′(x)=6x−4、f′(1)=2 与 f(1)=3，能确定什么？",
      prompt:
        "<p>已知 <code>F′(x)=6x−4</code>，且 <code>F′(1)=2</code>、<code>F(1)=3</code>。求 F(x)，并说明两个条件分别在做什么。</p>",
      hint:
        "<p>F′ 的条件用于核对导数形式，F(1) 才用于确定积分常数。注意不要重复使用同一个初值。</p>",
      steps:
        "<p>F(x)=3x²−4x+C；F(1)=3 给出 C=4。</p>",
      solution:
        "<p>因为 F′(x)=6x−4，逐项积分得 <code>F(x)=3x²−4x+C</code>。</p><p>条件 F′(1)=2 与 6(1)−4=2 自动一致，它没有增加确定常数 C 的信息。使用 F(1)=3：3−4+C=3，故 C=4。</p><p>所以 <code>F(x)=3x²−4x+4</code>。这说明：确定原函数常数要用未知函数的函数值，而不是已经给出的导数信息本身。</p>",
    },
    {
      id: "Q5-01",
      order: 1,
      chapter: "5",
      type: "概念辨析",
      level: "基础",
      section: "5.2",
      topic: "求和符号",
      promptText: "展开并计算 ∑ₖ₌₂⁵(2k−1)。",
      prompt:
        "<p>展开并计算 <code>∑<sub>k=2</sub><sup>5</sup>(2k−1)</code>，再说明求和指标从 k=1 改成 k=0 时需要怎样调整。</p>",
      hint:
        "<p>逐项代入 k=2,3,4,5；指标替换时项的表达式和上下限要同步变化。</p>",
      steps:
        "<p>相应项是 3、5、7、9。若从 k=0 开始，可写成 ∑<sub>0</sub><sup>3</sup>(2k+3)。</p>",
      solution:
        "<p><code>∑ₖ₌₂⁵(2k−1)=3+5+7+9=24</code>。</p><p>若改为 k=0 起始，每个旧指标都相当于新指标加 2，因此项变为 2(k+2)−1=2k+3，且上限相应为 3：<code>∑ₖ₌₀³(2k+3)</code>。指标名称本身不重要，但替换必须保持所有项不变。</p>",
    },
    {
      id: "Q5-02",
      order: 2,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.1",
      topic: "上、下和与中点法则",
      promptText: "用 4 个等宽矩形估计 ∫₀²x²dx 的左、右、中点和。",
      prompt:
        "<p>把 [0,2] 等分为 4 个小区间，分别用左端点、右端点和中点估计 <code>∫<sub>0</sub><sup>2</sup>x²dx</code>。</p>",
      hint:
        "<p>Δx=1/2。由于 x² 在 [0,2] 上递增，左端点和是下和，右端点和是上和。</p>",
      steps:
        "<p>三类采样点分别是 0,0.5,1,1.5；0.5,1,1.5,2；0.25,0.75,1.25,1.75。</p>",
      solution:
        "<p>Δx=1/2。</p><p>左端点和：<code>0.5(0²+0.5²+1²+1.5²)=1.75</code>。</p><p>右端点和：<code>0.5(0.5²+1²+1.5²+2²)=3.75</code>。</p><p>中点和：<code>0.5(0.25²+0.75²+1.25²+1.75²)=2.625</code>。</p><p>精确值 ∫₀²x²dx=8/3≈2.6667，落在下和与上和之间，中点估计也接近它。</p>",
    },
    {
      id: "Q5-03",
      order: 3,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.2",
      topic: "有限和公式",
      promptText: "计算 ∑ₖ₌₁²⁰(3k²−2k)。",
      prompt:
        "<p>用有限和公式计算 <code>∑<sub>k=1</sub><sup>20</sup>(3k²−2k)</code>。</p>",
      hint:
        "<p>分别使用前 n 个整数和与前 n 个平方和公式，再代入 n=20。</p>",
      steps:
        "<p>∑k=210，∑k²=2870。结果为 3(2870)−2(210)。</p>",
      solution:
        "<p>由线性法则，</p><p><code>∑(3k²−2k)=3∑k²−2∑k</code>。</p><p>代入 ∑k=20·21/2=210，∑k²=20·21·41/6=2870，得到 <code>3·2870−2·210=8610−420=8190</code>。</p>",
    },
    {
      id: "Q5-04",
      order: 4,
      chapter: "5",
      type: "证明/说明",
      level: "挑战",
      section: "5.2–5.3",
      topic: "Riemann 和极限",
      promptText: "把右端点和的极限识别为定积分并求值。",
      prompt:
        "<p>把 <code>lim<sub>n→∞</sub>∑<sub>k=1</sub><sup>n</sup>(2k/n)²(2/n)</code> 写成定积分，并计算其值。</p>",
      hint:
        "<p>识别 Δx=2/n 与采样点 xₖ=2k/n。求和指标对应右端点和。</p>",
      steps:
        "<p>它对应 ∫₀²x²dx。用前 n 个平方和公式求极限，或直接用 FTC。</p>",
      solution:
        "<p>这里 Δx=2/n，cₖ=2k/n，所以该极限是 f(x)=x² 在 [0,2] 上使用右端点的黎曼和极限：</p><p><code>∫₀²x²dx=[x³/3]₀²=8/3</code>。</p><p>若直接展开，和是 <code>(8/n³)∑k²=(8/n³)n(n+1)(2n+1)/6</code>，当 n→∞ 时也趋于 8/3。两条路径说明：只要连续，具体分割与采样方式不会改变定积分极限。</p>",
    },
    {
      id: "Q5-05",
      order: 5,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.3",
      topic: "定积分的性质",
      promptText: "由 ∫₀¹f=2、∫₁³f=5、∫₀³g=−1 求 ∫₀³(2f−3g)。",
      prompt:
        "<p>已知 <code>∫<sub>0</sub><sup>1</sup>f=2</code>、<code>∫<sub>1</sub><sup>3</sup>f=5</code>、<code>∫<sub>0</sub><sup>3</sup>g=−1</code>，求 <code>∫<sub>0</sub><sup>3</sup>(2f−3g)</code>。</p>",
      hint:
        "<p>先用可加性求 f 在 [0,3] 上的积分，再用线性性质。</p>",
      steps:
        "<p>∫₀³f=7；所求为 2∫₀³f−3∫₀³g。</p>",
      solution:
        "<p>由区间可加性，<code>∫₀³f=∫₀¹f+∫₁³f=2+5=7</code>。</p><p>再用常数倍与和差法则：<code>∫₀³(2f−3g)=2·7−3·(−1)=14+3=17</code>。</p>",
    },
    {
      id: "Q5-06",
      order: 6,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.3–5.4",
      topic: "带符号积分与总面积",
      promptText: "求 f(x)=x²−1 在 [-2,2] 上的定积分与总面积。",
      prompt:
        "<p>对 <code>f(x)=x²−1</code> 在 <code>[-2,2]</code> 上求定积分，并求曲线与 x 轴之间的总面积。</p>",
      hint:
        "<p>零点为 x=±1。定积分允许正负抵消；总面积要把每段面积的绝对值相加。</p>",
      steps:
        "<p>函数为偶函数。先算 [1,2] 上的正面积，再乘 2；定积分也可直接由原函数求。</p>",
      solution:
        "<p>x²−1 在 (−1,1) 上为负，在两端为正。由对称性，</p><p><code>∫₋₂²(x²−1)dx=2∫₀²(x²−1)dx=2(8/3−2)=4/3</code>。</p><p>总面积：中间负区域面积为 <code>|∫₋₁¹(x²−1)dx|=4/3</code>；两端正区域面积分别为 4/3，总共 <code>4/3+4/3+4/3=4</code>。所以定积分是 4/3，几何总面积是 4。</p>",
    },
    {
      id: "Q5-07",
      order: 7,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.3",
      topic: "平均值",
      promptText: "求 f(x)=4−x² 在 [-1,3] 上的平均值。",
      prompt:
        "<p>求 <code>f(x)=4−x²</code> 在 <code>[-1,3]</code> 上的平均值。</p>",
      hint:
        "<p>平均值是积分除以区间长度 4，而不是除以函数的极差。</p>",
      steps:
        "<p>先求 ∫₋₁³(4−x²)dx=20/3，再除以 4。</p>",
      solution:
        "<p><code>∫₋₁³(4−x²)dx=[4x−x³/3]₋₁³=(12−9)−(−4+1/3)=20/3</code>。</p><p>区间长度为 4，所以平均值为 <code>(20/3)/4=5/3</code>。</p>",
    },
    {
      id: "Q5-08",
      order: 8,
      chapter: "5",
      type: "证明/说明",
      level: "挑战",
      section: "5.4",
      topic: "FTC 第一部分与链式法则",
      promptText: "求 y=∫₂^{x³}√(1+t²)dt 的导数。",
      prompt:
        "<p>求 <code>y(x)=∫<sub>2</sub><sup>x³</sup>√(1+t²)dt</code> 的导数，并说明每一步使用了什么定理。</p>",
      hint:
        "<p>令 u=x³。外层函数对上限 u 求导，内层再用链式法则。</p>",
      steps:
        "<p>FTC 第一部分给出 dy/du=√(1+u²)，再乘 du/dx=3x²。</p>",
      solution:
        "<p>令 u=x³，则 <code>y(x)=∫₂ᵘ√(1+t²)dt</code>。</p><p>由于被积函数连续，FTC 第一部分给出 <code>dy/du=√(1+u²)</code>；链式法则再乘 <code>du/dx=3x²</code>。</p><p>因此 <code>dy/dx=3x²√(1+x⁶)</code>。</p>",
    },
    {
      id: "Q5-09",
      order: 9,
      chapter: "5",
      type: "计算题",
      level: "基础",
      section: "5.4",
      topic: "微积分基本定理求值",
      promptText: "计算 ∫₀²(3x²−2x+1)dx。",
      prompt:
        "<p>使用微积分基本定理计算 <code>∫<sub>0</sub><sup>2</sup>(3x²−2x+1)dx</code>。</p>",
      hint:
        "<p>先找一个原函数，再计算 F(2)−F(0)。</p>",
      steps:
        "<p>F(x)=x³−x²+x。</p>",
      solution:
        "<p>一个原函数为 F(x)=x³−x²+x。由 FTC 第二部分，</p><p><code>∫₀²(3x²−2x+1)dx=F(2)−F(0)=(8−4+2)−0=6</code>。</p>",
    },
    {
      id: "Q5-10",
      order: 10,
      chapter: "5",
      type: "应用题",
      level: "标准",
      section: "5.4",
      topic: "净变化定理",
      promptText: "边际成本 c′(x)=6x+10，求产量 10 到 20 的增量成本。",
      prompt:
        "<p>某产品的边际成本为 <code>c′(x)=6x+10</code>。用净变化定理求产量从 10 增加到 20 时增加的成本。首末单位或费用的具体货币单位未知，保留数值单位。</p>",
      hint:
        "<p>成本净增量等于边际成本函数的定积分。</p>",
      steps:
        "<p>成本增量 = ∫₁₀²⁰(6x+10)dx。</p>",
      solution:
        "<p>由净变化定理，<code>c(20)−c(10)=∫₁₀²⁰c′(x)dx</code>。</p><p><code>∫₁₀²⁰(6x+10)dx=[3x²+10x]₁₀²⁰</code>。</p><p>在 x=20 得 1200+200=1400；在 x=10 得 300+100=400；差为 1000。因此增加成本为 1000 个相应费用单位。</p>",
    },
    {
      id: "Q5-11",
      order: 11,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.5",
      topic: "不定积分换元",
      promptText: "计算 ∫x²√(x³+1)dx。",
      prompt:
        "<p>计算不定积分 <code>∫x²√(x³+1)dx</code>，并用求导检查答案。</p>",
      hint:
        "<p>令 u=x³+1，则 du=3x²dx。</p>",
      steps:
        "<p>x²dx=(1/3)du，因此积分为 (1/3)∫u^{1/2}du。</p>",
      solution:
        "<p>令 u=x³+1，则 du=3x²dx，所以 x²dx=du/3。</p><p><code>∫x²√(x³+1)dx=(1/3)∫u^{1/2}du=(1/3)(2/3)u^{3/2}+C</code>。</p><p>即 <code>(2/9)(x³+1)^{3/2}+C</code>。求导得 x²√(x³+1)，与原被积函数一致。</p>",
    },
    {
      id: "Q5-12",
      order: 12,
      chapter: "5",
      type: "计算题",
      level: "标准",
      section: "5.6",
      topic: "定积分换元",
      promptText: "计算 ∫₀¹x(x²+3)⁵dx。",
      prompt:
        "<p>用换元法计算 <code>∫<sub>0</sub><sup>1</sup>x(x²+3)<sup>5</sup>dx</code>。</p>",
      hint:
        "<p>令 u=x²+3。积分限也要从 x=0,1 变为 u=3,4。</p>",
      steps:
        "<p>x dx=du/2，积分为 (1/2)∫₃⁴u⁵du。</p>",
      solution:
        "<p>令 u=x²+3，du=2xdx，故 xdx=du/2。x=0 时 u=3，x=1 时 u=4。</p><p><code>∫₀¹x(x²+3)⁵dx=(1/2)∫₃⁴u⁵du=(1/12)[u⁶]₃⁴</code>。</p><p>结果为 <code>(4⁶−3⁶)/12=(4096−729)/12=3367/12≈280.58</code>。</p>",
    },
    {
      id: "Q5-13",
      order: 13,
      chapter: "5",
      type: "证明/说明",
      level: "标准",
      section: "5.6",
      topic: "奇偶函数积分",
      promptText: "利用对称性计算 ∫₋ₐᵃ(x³+cos x)dx。",
      prompt:
        "<p>利用对称性计算 <code>∫<sub>−a</sub><sup>a</sup>(x³+cos x)dx</code>，其中 a&gt;0，并写出依据。</p>",
      hint:
        "<p>分别判断 x³ 与 cos x 的奇偶性；积分对和可以拆分。</p>",
      steps:
        "<p>x³ 是奇函数，贡献 0；cos x 是偶函数，贡献 2sin a。</p>",
      solution:
        "<p>x³ 是奇函数，故 <code>∫₋ₐᵃx³dx=0</code>；cos x 是偶函数，故 <code>∫₋ₐᵃcos x dx=2∫₀ᵃcos x dx=2sin a</code>。</p><p>因此总积分为 <code>2sin a</code>。这一步使用对称区间上的奇偶函数积分定理，而非假设任意函数都满足该简化。</p>",
    },
    {
      id: "Q5-14",
      order: 14,
      chapter: "5",
      type: "应用题",
      level: "标准",
      section: "5.6",
      topic: "两曲线间面积",
      promptText: "求 y=x² 与 y=2−x 围成的面积。",
      prompt:
        "<p>求曲线 <code>y=x²</code> 与直线 <code>y=2−x</code> 所围区域面积。</p>",
      hint:
        "<p>先求交点，确定谁在上方，再积分上减下。</p>",
      steps:
        "<p>x²=2−x 给 x=−2,1；在区间内 2−x 在上方。</p>",
      solution:
        "<p>交点满足 x²=2−x，即 x²+x−2=0，所以 x=−2,1。在 (−2,1) 内，<code>2−x−x²&gt;0</code>，直线在上方。</p><p><code>A=∫₋₂¹[(2−x)−x²]dx=[2x−x²/2−x³/3]₋₂¹</code>。</p><p>代入得 <code>7/6−(−10/3)=9/2</code>。面积为 9/2。</p>",
    },
    {
      id: "Q5-15",
      order: 15,
      chapter: "5",
      type: "综合题",
      level: "挑战",
      section: "5.4–5.6",
      topic: "位移、路程和转向",
      promptText: "v(t)=t²−4，0≤t≤3，求位移与总路程。",
      prompt:
        "<p>质点的速度为 <code>v(t)=t²−4</code>，<code>0≤t≤3</code>。求位移与总路程，并解释两者为什么不同。</p>",
      hint:
        "<p>v 在 t=2 变号。位移积 v，总路程积分 |v|，因此积分区间应在 t=2 处分段。</p>",
      steps:
        "<p>∫₀²v=−16/3；∫₂³v=7/3。</p>",
      solution:
        "<p>位移为 <code>∫₀³(t²−4)dt=[t³/3−4t]₀³=9−12=−3</code>。</p><p>速度在 0≤t&lt;2 为负、在 2&lt;t≤3 为正，因此总路程为</p><p><code>|∫₀²(t²−4)dt|+|∫₂³(t²−4)dt|=16/3+7/3=23/3</code>。</p><p>位移是末位置减初位置，正负变化会抵消；总路程使用速率 |v|，所以两段路程都作为正贡献相加。</p>",
    },
  ],
};
