window.BATCH_FORMULAS = {
  "b9-characteristic": "ay''+by'+cy=0\\quad\\leadsto\\quad ar^2+br+c=0",
  "b9-distinct-real": "r_1\\ne r_2\\quad\\Longrightarrow\\quad y=C_1e^{r_1x}+C_2e^{r_2x}",
  "b9-repeated-root": "r_1=r_2=r\\quad\\Longrightarrow\\quad y=(C_1+C_2x)e^{rx}",
  "b9-complex-roots": "r=\\alpha\\pm i\\beta\\quad\\Longrightarrow\\quad y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)",
  "b9-wronskian": "W(y_1,y_2)(x)=y_1y_2'-y_1'y_2",
  "b9-complementary": "Ly=g(x)\\quad\\Longrightarrow\\quad y=y_h+y_p",
  "b9-variation": "y_p=-y_1\\int\\frac{y_2g}{aW}\\,dx+y_2\\int\\frac{y_1g}{aW}\\,dx",
  "b9-resonance": "y''+\\omega_0^2y=F_0\\cos\\omega t\\quad\\text{with }\\omega=\\omega_0",
  "b9-spring": "m\\frac{d^2y}{dt^2}+b\\frac{dy}{dt}+ky=F(t)",
  "b9-damping": "b^2-4mk\\begin{cases}>0&\\text{overdamped}\\\\=0&\\text{critically damped}\\\\<0&\\text{underdamped}\\end{cases}",
  "b9-rlc": "L\\frac{d^2q}{dt^2}+R\\frac{dq}{dt}+\\frac1Cq=E(t)",
  "b9-euler": "ax^2y''+bxy'+cy=0,\\qquad x>0",
  "b9-euler-roots": "ar(r-1)+br+c=0",
  "b9-power-series": "y=\\sum_{n=0}^{\\infty}a_nx^n",
  "b9-recurrence": "(n+2)(n+1)a_{n+2}+\\cdots=0"
};

window.STUDY_CONTENT = {
  "terms": [
    {
      "en": "second-order differential equation",
      "zh": "二阶微分方程",
      "definition": "含未知函数二阶导数的微分方程。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "second-order linear equation",
      "zh": "二阶线性方程",
      "definition": "未知函数及其一二阶导数以一次项出现。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "homogeneous linear equation",
      "zh": "齐次线性方程",
      "definition": "右端为 0 的二阶线性方程。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "nonhomogeneous linear equation",
      "zh": "非齐次线性方程",
      "definition": "右端 forcing function 非零的线性方程。",
      "section": "17.2",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "constant-coefficient equation",
      "zh": "常系数方程",
      "definition": "y″、y′、y 的系数为常数。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "characteristic equation",
      "zh": "特征方程",
      "definition": "代入指数解后得到的二次代数方程。",
      "section": "17.1",
      "chapter": "17",
      "note": "ar²+br+c=0"
    },
    {
      "en": "characteristic roots",
      "zh": "特征根",
      "definition": "特征方程的根。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "fundamental solutions",
      "zh": "基本解",
      "definition": "组成齐次方程通解的一组线性无关解。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "general solution",
      "zh": "通解",
      "definition": "齐次基本解的任意线性组合。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "initial value problem",
      "zh": "初值问题",
      "definition": "二阶方程加 y(x0) 与 y′(x0) 两个初值。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "initial conditions",
      "zh": "初始条件",
      "definition": "指定函数值和一阶导数。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "linear independence",
      "zh": "线性无关",
      "definition": "两个函数不能由彼此乘常数相加得到。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "Wronskian",
      "zh": "Wronskian行列式",
      "definition": "由两个基本解及其导数构成的判别量。",
      "section": "17.1",
      "chapter": "17",
      "note": "W=y1y2′−y1′y2"
    },
    {
      "en": "distinct real roots",
      "zh": "相异实根",
      "definition": "特征方程有两个不同实根。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "repeated real root",
      "zh": "重实根",
      "definition": "特征方程只有一个二重实根。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "complex conjugate roots",
      "zh": "共轭复根",
      "definition": "特征根形式为 α±iβ。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "Euler formula",
      "zh": "Euler公式",
      "definition": "把复指数展开为余弦加 i 倍正弦。",
      "section": "17.1",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "complementary solution",
      "zh": "齐次解",
      "definition": "非齐次方程对应齐次方程的通解。",
      "section": "17.2",
      "chapter": "17",
      "note": "y_h"
    },
    {
      "en": "particular solution",
      "zh": "特解",
      "definition": "满足非齐次方程但通常不含任意常数的解。",
      "section": "17.2",
      "chapter": "17",
      "note": "y_p"
    },
    {
      "en": "superposition principle",
      "zh": "叠加原理",
      "definition": "线性方程不同右端解可以相加。",
      "section": "17.2",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "forcing function",
      "zh": "强迫函数",
      "definition": "非齐次方程右端的外部输入。",
      "section": "17.2",
      "chapter": "17",
      "note": "g(x)"
    },
    {
      "en": "undetermined coefficients",
      "zh": "待定系数法",
      "definition": "按右端形式猜测特解并求系数。",
      "section": "17.2",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "variation of parameters",
      "zh": "参数变易法",
      "definition": "允许齐次解系数变化以构造特解。",
      "section": "17.2",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "resonance",
      "zh": "共振",
      "definition": "强迫频率与自然频率相同时出现振幅增长。",
      "section": "17.2",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "mechanical vibration",
      "zh": "机械振动",
      "definition": "弹簧–质量系统围绕平衡位置的往复运动。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "spring constant",
      "zh": "弹性系数",
      "definition": "恢复力与位移成比例的常数。",
      "section": "17.3",
      "chapter": "17",
      "note": "k"
    },
    {
      "en": "damping coefficient",
      "zh": "阻尼系数",
      "definition": "阻尼力与速度成比例的常数。",
      "section": "17.3",
      "chapter": "17",
      "note": "b"
    },
    {
      "en": "free undamped motion",
      "zh": "无阻尼自由振动",
      "definition": "无外力且无阻尼的简谐运动。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "underdamped motion",
      "zh": "欠阻尼",
      "definition": "阻尼较小，解以指数包络振荡。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "critically damped motion",
      "zh": "临界阻尼",
      "definition": "阻尼恰使根重根，最快无振荡回到平衡。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "overdamped motion",
      "zh": "过阻尼",
      "definition": "阻尼较大，解由两个衰减指数组合。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "natural frequency",
      "zh": "自然频率",
      "definition": "无阻尼系统的固有振荡频率。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "damped pseudo-frequency",
      "zh": "阻尼振频",
      "definition": "欠阻尼系统实际振荡的角频率。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "forced motion",
      "zh": "强迫振动",
      "definition": "受到外部时变力驱动的系统响应。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "transient response",
      "zh": "瞬态响应",
      "definition": "随 t 增大逐渐消失的齐次响应。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "steady-state response",
      "zh": "稳态响应",
      "definition": "长期保留的外部驱动响应。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "electrical circuit",
      "zh": "电路",
      "definition": "由电感、电阻、电容等构成线性动态系统。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "inductance",
      "zh": "电感",
      "definition": "以 L di/dt 产生电压降的电路参数。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "capacitance",
      "zh": "电容",
      "definition": "电压与电荷成比例，参数为 1/C。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "impedance",
      "zh": "阻抗",
      "definition": "电路对交流电流的总阻碍，含幅值与相位。",
      "section": "17.3",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "Euler equation",
      "zh": "Euler方程",
      "definition": "含有 x²y″、xy′、y 项的变系数线性方程。",
      "section": "17.4",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "Cauchy-Euler equation",
      "zh": "Cauchy-Euler方程",
      "definition": "Euler 方程的另一种名称。",
      "section": "17.4",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "Euler characteristic equation",
      "zh": "Euler特征方程",
      "definition": "由 y=x^r 得到的 r 的二次方程。",
      "section": "17.4",
      "chapter": "17",
      "note": "ar(r−1)+br+c=0"
    },
    {
      "en": "power-series solution",
      "zh": "幂级数解",
      "definition": "把解写成 Σaₙxⁿ 并逐项匹配。",
      "section": "17.5",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "recurrence relation",
      "zh": "递推关系",
      "definition": "由相同幂次系数等于零得到系数关系。",
      "section": "17.5",
      "chapter": "17",
      "note": ""
    },
    {
      "en": "ordinary point",
      "zh": "常点",
      "definition": "方程系数在该点及附近可解析展开。",
      "section": "17.5",
      "chapter": "17",
      "note": ""
    }
  ],
  "exercises": [
    {
      "id": "Q17-01",
      "order": 1,
      "chapter": "17",
      "type": "概念辨析",
      "level": "基础",
      "section": "17.1",
      "topic": "阶数、线性与齐次性",
      "promptText": "判断 y″+3y′+2y=0 的类型。",
      "prompt": "<p>判断 <code>y″+3y′+2y=0</code> 的阶数、线性性与齐次性，并说明应使用什么方法。</p>",
      "hint": "<p>看最高阶导数和各项对 y 的次数。</p>",
      "steps": "<p>二阶、线性、常系数、齐次。</p>",
      "solution": "<p>该方程是二阶常系数齐次线性方程；由特征方程 <code>r²+3r+2=0</code> 求基本解。</p>"
    },
    {
      "id": "Q17-02",
      "order": 2,
      "chapter": "17",
      "type": "计算题",
      "level": "基础",
      "section": "17.1",
      "topic": "相异实根",
      "promptText": "解 y″−3y′+2y=0。",
      "prompt": "<p>求 <code>y″-3y′+2y=0</code> 的通解。</p>",
      "hint": "<p>特征方程 r²−3r+2=0。</p>",
      "steps": "<p>根为 1、2。</p>",
      "solution": "<p><code>y=C1e^x+C2e^{2x}</code>。</p>"
    },
    {
      "id": "Q17-03",
      "order": 3,
      "chapter": "17",
      "type": "计算题",
      "level": "标准",
      "section": "17.1",
      "topic": "重根",
      "promptText": "解 y″+4y′+4y=0。",
      "prompt": "<p>求 <code>y″+4y′+4y=0</code> 的通解。</p>",
      "hint": "<p>特征方程 (r+2)²=0。</p>",
      "steps": "<p>二重根 r=−2。</p>",
      "solution": "<p><code>y=(C1+C2x)e^{-2x}</code>。</p>"
    },
    {
      "id": "Q17-04",
      "order": 4,
      "chapter": "17",
      "type": "计算题",
      "level": "标准",
      "section": "17.1",
      "topic": "复根",
      "promptText": "解 y″+9y=0。",
      "prompt": "<p>求 <code>y″+9y=0</code> 的通解。</p>",
      "hint": "<p>特征根 r=±3i。</p>",
      "steps": "<p>α=0，β=3。</p>",
      "solution": "<p><code>y=C1cos3x+C2sin3x</code>。</p>"
    },
    {
      "id": "Q17-05",
      "order": 5,
      "chapter": "17",
      "type": "计算题",
      "level": "标准",
      "section": "17.1",
      "topic": "二阶初值问题",
      "promptText": "y″−y=0,y(0)=1,y′(0)=2。",
      "prompt": "<p>求解 <code>y″-y=0</code>，<code>y(0)=1, y′(0)=2</code>。</p>",
      "hint": "<p>通解为 C1e^x+C2e^{−x}。</p>",
      "steps": "<p>C1+C2=1，C1−C2=2。</p>",
      "solution": "<p>C1=3/2、C2=−1/2，所以 <code>y=(3/2)e^x−(1/2)e^{-x}</code>。</p>"
    },
    {
      "id": "Q17-06",
      "order": 6,
      "chapter": "17",
      "type": "计算题",
      "level": "标准",
      "section": "17.2",
      "topic": "简单非齐次方程",
      "promptText": "解 y″+y=4。",
      "prompt": "<p>求 <code>y″+y=4</code> 的通解。</p>",
      "hint": "<p>齐次解加常数特解。</p>",
      "steps": "<p>y_h=C1cos x+C2sin x，y_p=4。</p>",
      "solution": "<p><code>y=C1cos x+C2sin x+4</code>。</p>"
    },
    {
      "id": "Q17-07",
      "order": 7,
      "chapter": "17",
      "type": "计算题",
      "level": "挑战",
      "section": "17.2",
      "topic": "共振强迫",
      "promptText": "解 y″+y=2sin x。",
      "prompt": "<p>求 <code>y″+y=2sin x</code> 的通解。</p>",
      "hint": "<p>右端频率与自然频率相同，特解尝试 Ax cos x。</p>",
      "steps": "<p>取 yp=Ax cos x，则 yp″+yp=−2A sin x。</p>",
      "solution": "<p>A=−1，所以 <code>y=C1cos x+C2sin x−x cos x</code>。</p>"
    },
    {
      "id": "Q17-08",
      "order": 8,
      "chapter": "17",
      "type": "证明/说明",
      "level": "挑战",
      "section": "17.2",
      "topic": "参数变易法",
      "promptText": "用参数变易法求 y″+y=sec x。",
      "prompt": "<p>用参数变易法求 <code>y″+y=sec x</code> 的一个特解。</p>",
      "hint": "<p>取 y1=cos x、y2=sin x，W=1。</p>",
      "steps": "<p>u1′=−tan x，u2′=1，所以 u1=ln|cos x|、u2=x。</p>",
      "solution": "<p>特解 <code>yp=cos x ln|cos x|+x sin x</code>；通解再加 C1cos x+C2sin x。</p>"
    },
    {
      "id": "Q17-09",
      "order": 9,
      "chapter": "17",
      "type": "应用题",
      "level": "基础",
      "section": "17.3",
      "topic": "无阻尼弹簧",
      "promptText": "m=1,k=4,y(0)=1,y′(0)=0。",
      "prompt": "<p>无阻尼弹簧系统 <code>m=1, k=4</code>，初值 <code>y(0)=1, y′(0)=0</code>，求位移。</p>",
      "hint": "<p>方程 y″+4y=0。</p>",
      "steps": "<p>解 y=C1cos2t+C2sin2t。</p>",
      "solution": "<p>初值给 C1=1、C2=0，所以 <code>y=cos2t</code>。</p>"
    },
    {
      "id": "Q17-10",
      "order": 10,
      "chapter": "17",
      "type": "概念辨析",
      "level": "基础",
      "section": "17.3",
      "topic": "阻尼分类",
      "promptText": "m=1,b=4,k=4 属哪种阻尼？",
      "prompt": "<p>弹簧–质量系统 <code>m=1, b=4, k=4</code> 属于过阻尼、临界阻尼还是欠阻尼？</p>",
      "hint": "<p>计算 b²−4mk。</p>",
      "steps": "<p>16−16=0。</p>",
      "solution": "<p>判别式为 0，属于临界阻尼；自由响应无振荡并最快回到平衡。</p>"
    },
    {
      "id": "Q17-11",
      "order": 11,
      "chapter": "17",
      "type": "应用题",
      "level": "标准",
      "section": "17.3",
      "topic": "强迫共振条件",
      "promptText": "何时无阻尼受迫系统发生共振？",
      "prompt": "<p>无阻尼系统 <code>my″+ky=F0cos(ωt)</code> 在什么条件下出现共振？</p>",
      "hint": "<p>比较强迫频率与自然频率。</p>",
      "steps": "<p>自然频率为 √(k/m)。</p>",
      "solution": "<p>当 <code>ω=√(k/m)</code> 时发生共振；特解含 <code>t cos ωt</code> 或 <code>t sin ωt</code>，振幅随时间线性增长。</p>"
    },
    {
      "id": "Q17-12",
      "order": 12,
      "chapter": "17",
      "type": "计算题",
      "level": "标准",
      "section": "17.4",
      "topic": "Euler方程实异根",
      "promptText": "解 x²y″−2y=0,x>0。",
      "prompt": "<p>求 <code>x²y″-2y=0</code>（x&gt;0）的通解。</p>",
      "hint": "<p>尝试 y=x^r。</p>",
      "steps": "<p>r(r−1)−2=r²−r−2=(r−2)(r+1)。</p>",
      "solution": "<p>根为 2、−1，所以 <code>y=C1x²+C2/x</code>。</p>"
    },
    {
      "id": "Q17-13",
      "order": 13,
      "chapter": "17",
      "type": "计算题",
      "level": "挑战",
      "section": "17.4",
      "topic": "Euler方程重根",
      "promptText": "解 x²y″+3xy′+y=0,x>0。",
      "prompt": "<p>求 <code>x²y″+3xy′+y=0</code>（x&gt;0）的通解。</p>",
      "hint": "<p>代入 y=x^r，得到 r(r−1)+3r+1。</p>",
      "steps": "<p>(r+1)²=0。</p>",
      "solution": "<p>重根 r=−1，所以 <code>y=(C1+C2ln x)/x</code>。</p>"
    },
    {
      "id": "Q17-14",
      "order": 14,
      "chapter": "17",
      "type": "证明/说明",
      "level": "挑战",
      "section": "17.5",
      "topic": "幂级数递推",
      "promptText": "用幂级数解 y″−y=0。",
      "prompt": "<p>设 <code>y=Σaₙxⁿ</code>，用幂级数求 <code>y″-y=0</code> 的通解。</p>",
      "hint": "<p>匹配 xⁿ 的系数。</p>",
      "steps": "<p>(n+2)(n+1)a_{n+2}−a_n=0。</p>",
      "solution": "<p>a_{n+2}=a_n/((n+2)(n+1))。偶系数生成 cosh x，奇系数生成 sinh x，因此 <code>y=C1cosh x+C2sinh x</code>。</p>"
    },
    {
      "id": "Q17-15",
      "order": 15,
      "chapter": "17",
      "type": "综合题",
      "level": "挑战",
      "section": "17.1,17.3",
      "topic": "复根初值响应",
      "promptText": "解 y″+2y′+2y=0,y(0)=1,y′(0)=0。",
      "prompt": "<p>求解 <code>y″+2y′+2y=0</code>，<code>y(0)=1, y′(0)=0</code>，并描述长期行为。</p>",
      "hint": "<p>特征方程 r²+2r+2=0，得到 −1±i。</p>",
      "steps": "<p>通解 e^{-x}(C1cos x+C2sin x)；初值给 C1=1，C2=1。</p>",
      "solution": "<p><code>y=e^{-x}(cos x+sin x)</code>。它振荡衰减并趋于 0，属于欠阻尼型响应。</p>"
    }
  ]
};
